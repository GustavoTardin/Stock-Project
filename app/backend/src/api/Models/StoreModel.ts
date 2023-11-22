import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/stores/IStoreModel'

class StoreModel implements IStoreModel {
  private _db: PrismaClient
  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getAll() {
    const stores = await this._db.store.findMany()
    return stores
  }

  async checkIds(ids: number[]): Promise<boolean> {
    const stores = await Promise.all(
      ids.map((id) => this._db.store.findUnique({ where: { id } })),
    )
    console.log(stores, ids.length)
    return stores.every((e) => e !== null)
  }

  async createStoreSellers(userId: number, storeIds: number[]) {
    const createdSellers = await Promise.all(
      storeIds.map((storeId) =>
        this._db.storeSellers.create({
          data: {
            userId,
            storeId,
          },
        }),
      ),
    )

    return createdSellers
  }
}

export default StoreModel
