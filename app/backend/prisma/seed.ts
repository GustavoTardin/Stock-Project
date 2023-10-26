import prisma from '../src/api/database/prisma'
import users from './seeds/users'

async function seedUsers() {
  for (const user of users) {
    const existingUser = await prisma.user.findFirst({
      where: {
        nickName: user.nickName,
      },
    })

    if (!existingUser) {
      // Se o usuário não existe, crie-o
      await prisma.user.create({
        data: user,
      })
    }
  }
}

async function seedCredentials() {}

async function main() {
  await seedUsers()
  await seedCredentials()
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
