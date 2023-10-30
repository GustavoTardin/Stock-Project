import { PrismaClient } from '@prisma/client'
import prisma from '../database/prisma'

class UserModel {
  db: PrismaClient

  constructor(prisma: PrismaClient) {
    this.db = prisma
  }
}

export default UserModel
