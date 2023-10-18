import { PrismaClient } from '@prisma/client';
import users from './seeds/users';

const prisma = new PrismaClient();

async function main() {
  // eslint-disable-next-line prefer-const
  for (let user of users) {
    await prisma.User.create({
      data: user,
    });
  }
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());