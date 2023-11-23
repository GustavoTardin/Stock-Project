import { PrismaClient } from '@prisma/client'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/storeSellers/IStoreSellerModel'

class StoreSellerModel implements IStoreSellerModel {
  private _db: PrismaClient
  constructor(prisma: PrismaClient) {
    this._db = prisma
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

export default StoreSellerModel
