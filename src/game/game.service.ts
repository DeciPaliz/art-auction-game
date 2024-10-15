import { ForbiddenException, Injectable } from '@nestjs/common';
import { ListGamesDto } from './dto/list-games.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JoinGameDto } from './dto/join-game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  async listGames(dto: ListGamesDto) {
    const where: Prisma.GameWhereInput = {
      currentTurn: null,
    };
    if (dto.noPassword) {
      where.hash = null;
    }
    if (dto.started) {
      delete where.currentTurn;
    }
    let games = await this.prisma.game.findMany({
      where,
      include: { players: { select: { id: true } } },
    });

    if (!dto.unavailable) {
      games = games.filter((game) => game.players.length !== game.maxPlayers);
    }

    return games.map(this.gamePublicTransformer);
  }

  async createGame(userId: number, dto: CreateGameDto) {
    try {
      await this.prisma.game.create({
        data: {
          hostId: userId,
          maxPlayers: dto.maxPlayers,
          hash: dto.password && (await argon.hash(dto.password)),
        },
      });

      return this.joinGame(userId, { gameId: userId, password: dto.password });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('game already exists');
        }
      }
      throw err;
    }
  }

  async leaveGame(userId: number) {
    const game = await this.prisma.game.findFirst({
      where: { players: { some: { id: userId } } },
      include: { players: { select: { id: true } } },
    });
    if (game === null) {
      throw new ForbiddenException('not a part of any game');
    }

    if (game.currentTurn !== null || game.players.length === 1) {
      await this.prisma.game.delete({ where: { hostId: game.hostId } });
    } else {
      await this.prisma.playerInfo.delete({ where: { id: userId } });
    }
  }

  async getMyGame(userId: number) {
    const playerInfo = await this.prisma.playerInfo.findUnique({
      where: { id: userId },
      include: { game: { include: { players: { select: { id: true } } } } },
    });
    if (!playerInfo) return null;
    return this.gamePublicTransformer(playerInfo.game);
  }

  async joinGame(userId: number, dto: JoinGameDto) {
    const gameExists = await this.prisma.game.findFirst({
      where: { players: { some: { id: userId } } },
    });
    if (gameExists !== null) {
      throw new ForbiddenException('already a part of a game');
    }

    const game = await this.prisma.game.findUnique({
      where: { hostId: dto.gameId },
      include: { players: { select: { id: true } } },
    });
    if (game === null) {
      throw new ForbiddenException("the game doens't exist");
    }
    if (game.players.length >= game.maxPlayers) {
      throw new ForbiddenException('the game is already full');
    }
    if (game.hash && !dto.password) {
      throw new ForbiddenException('a password is required');
    }
    if (!(await argon.verify(game.hash, dto.password))) {
      throw new ForbiddenException('invalid password');
    }

    return await this.prisma.playerInfo.create({
      data: { gameId: dto.gameId, id: userId },
    });
  }

  gamePublicTransformer(game: Game & { players: ({ id: number } & any)[] }) {
    return {
      hostId: game.hostId,
      maxPlayers: game.maxPlayers,
      players: game.players.map(({ id }) => id),
      started: game.currentTurn !== null,
      password: game.hash !== null,
    };
  }
}
