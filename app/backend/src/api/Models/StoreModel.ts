import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/stores/IStoreModel'
import { ISimpleStore } from '../Contracts/interfaces/stores'
class StoreModel implements IStoreModel {
  private _db: PrismaClient
  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getAll() {
    const stores = await this._db.store.findMany()
    return stores
  }

  async findById(id: number): Promise<ISimpleStore | null> {
    const store = await this._db.store.findUnique({ where: { id } })
    return store
  }
}

export default StoreModel
