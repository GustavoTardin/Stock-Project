import prisma from './prisma'
import users from './seeds/users'
import credentials from './seeds/credentials'
import { HashedPassword } from '../Utils/hashPassword'

async function seedCredentials() {
  await Promise.all(
    credentials.map(async (credential) => {
      await prisma.credential.upsert({
        where: {
          credentialName: credential.credentialName,
        },
        create: {
          ...credential,
        },
        update: {},
      })
    }),
  )
}

async function seedUsers() {
  await Promise.all(
    users.map(async (user) => {
      const usertest = await new HashedPassword(user).crypta()
      await prisma.user.upsert({
        where: {
          nickName: user.nickName,
        },
        create: {
          ...usertest,
        },
        update: {},
      })
    }),
  )
}

async function main() {
  console.log('Start seeding...')
  await seedCredentials()
  await seedUsers()
  console.log('seed completed')
}

main()
  .catch((e) => {
    console.log('ola')
    console.log(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
