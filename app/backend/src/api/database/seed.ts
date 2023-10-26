import prisma from './prisma'
import createUsers from './seeds/users'
import credentials from './seeds/credentials'

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
  const users = await createUsers('1234')
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.upsert({
        where: {
          nickName: user.nickName,
        },
        create: {
          ...user,
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
