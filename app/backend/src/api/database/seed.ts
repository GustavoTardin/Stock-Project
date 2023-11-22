import prisma from './prisma'
import users from './seeds/users'
import credentials from './seeds/credentials'
import stores from './seeds/stores'

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
      const createdUser = await prisma.user.upsert({
        where: {
          nickName: user.nickName,
        },
        create: {
          ...user,
        },
        update: {},
      })

      console.log(`User with id ${createdUser.id} created successfully`)
    }),
  )
}

async function seedStores() {
  await Promise.all(
    stores.map(async (store) => {
      const createdStore = await prisma.store.upsert({
        where: { id: store.id },
        create: { ...store },
        update: {},
      })
      console.log(`Store with id ${createdStore.id} created successfully`)
    }),
  )
}

async function main() {
  console.log('Start seeding...')
  await seedCredentials()
  await seedUsers()
  await seedStores()
  console.log('seed completed!!!')
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
