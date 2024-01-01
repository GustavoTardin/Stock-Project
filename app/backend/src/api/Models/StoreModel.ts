import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/stores/IStoreModel'
import { ISimpleStore } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
class StoreModel implements IStoreModel {
  private _db: PrismaClient
  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getAll() {
    const stores = await this._db.store.findMany()
    return stores
  }

  async getById(
    id: number,
    includeInactive: boolean,
  ): Promise<ISimpleStore | null> {
    const store = await this._db.store.findUnique({
      where: includeInactive ? { id } : { id, active: true },
    })
    return store
  }
}

const storeModel = new StoreModel(prisma)

export default storeModel
