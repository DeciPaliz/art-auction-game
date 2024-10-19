import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const RANDOM_USERS = 10;
const PASSWORD_GAMES = 2;
const STARTED_GAMES = 2;
const STARTED_AND_PASSWORD_GAMES = 1;
const OTHER_GAMES = 5;

const prisma = new PrismaClient();

async function generateUser() {
  let email, name;
  while (true) {
    email = faker.internet.email();
    if ((await prisma.user.findUnique({ where: { email } })) !== null) continue;

    name = faker.internet.userName();
    if ((await prisma.user.findFirst({ where: { name } })) !== null) continue;

    break;
  }

  return await prisma.user.create({
    data: {
      email,
      name,
      hash: await argon.hash(faker.internet.password()),
    },
  });
}

async function generateGame(options?: {
  started?: boolean;
  password?: boolean;
}) {
  options = options ?? {};

  const host = await generateUser();
  const game = {
    maxPlayers: 3 + Math.floor(Math.random() * 3),
    currentRound: options.started && 1,
    hash: options.password && (await argon.hash(faker.internet.password())),
    hostId: host.id,
  };

  await prisma.game.create({
    data: game,
  });
  await prisma.playerInfo.create({
    data: {
      gameId: host.id,
      id: host.id,
      turnOrder: 0,
    },
  });

  let playersToGenerate = Math.floor(Math.random() * game.maxPlayers);
  if (options.started) playersToGenerate = game.maxPlayers - 1;

  for (let i = 1; i < playersToGenerate + 1; i++) {
    const user = await generateUser();
    await prisma.playerInfo.create({
      data: {
        gameId: host.id,
        id: user.id,
        turnOrder: i,
      },
    });
  }

  return game;
}

async function main() {
  for (let i = 0; i < RANDOM_USERS; i++) await generateUser();
  for (let i = 0; i < OTHER_GAMES; i++) await generateGame();
  for (let i = 0; i < STARTED_GAMES; i++) await generateGame({ started: true });
  for (let i = 0; i < PASSWORD_GAMES; i++)
    await generateGame({ password: true });
  for (let i = 0; i < STARTED_AND_PASSWORD_GAMES; i++)
    await generateGame({ started: true, password: true });
}

main();
