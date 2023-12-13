import { PrismaClient } from '@prisma/client'
import ITransaction from '../prisma/ITransaction'

interface IModel<T, C> {
  db: PrismaClient
  getAll(includeInactive: boolean): Promise<T[]>
  getById(id: number, includeInactive: boolean): Promise<T | null>
  create(obj: C, tx: ITransaction): Promise<T>
}

export default IModel
