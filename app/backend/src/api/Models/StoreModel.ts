import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/stores/IStoreModel'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
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

  async createStoreSellers(
    userId: number,
    storeIds: number[],
    transaction: ITransaction,
  ) {
    const createdSellers = await Promise.all(
      storeIds.map((storeId) =>
        transaction.storeSellers.create({
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
