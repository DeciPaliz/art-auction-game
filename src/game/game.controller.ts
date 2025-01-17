import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/decorator/get-user';
import { JoinGameDto } from './dto/join-game.dto';

@Controller('api/games')
export class GameController {
  constructor(private game: GameService) {}

  @Get('list')
  async listGames(
    @Query('noPassword') noPassword: string,
    @Query('started') started: string,
    @Query('unavailable') unavailable: string,
  ) {
    return this.game.listGames(
      noPassword === 'true',
      started === 'true',
      unavailable === 'true',
    );
  }

  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create')
  async createGame(@GetUser('id') userId: number, @Body() dto: CreateGameDto) {
    return this.game.createGame(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Get('my')
  async getMyGame(@GetUser('id') userId: number) {
    return this.game.getMyGame(userId);
  }

  @UseGuards(JwtGuard)
  @Post('join')
  async joinGame(@GetUser('id') userId: number, @Body() dto: JoinGameDto) {
    return this.game.joinGame(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('leave')
  async leaveGame(@GetUser('id') userId: number) {
    return this.game.leaveGame(userId);
  }
}
