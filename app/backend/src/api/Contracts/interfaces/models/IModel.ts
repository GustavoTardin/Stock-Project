import { PrismaClient } from '@prisma/client'

interface IModel<T> {
  db: PrismaClient
  getAll(includeInactive: boolean): Promise<T[]>
  getById(id: number, includeInactive: boolean): Promise<T | null>
}

export default IModel
