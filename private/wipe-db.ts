import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tables = ['user', 'playerInfo', 'game', 'card'];
  await Promise.all(
    tables.map(async (table) => {
      return prisma[table].deleteMany({});
    }),
  );
}

main();
