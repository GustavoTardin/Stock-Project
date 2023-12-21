import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/models/IStoreModel'
import { IDbStore, ISimpleStore } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
class StoreModel implements IStoreModel {
  private _db: PrismaClient
  private _select = {
    id: true,
    storeName: true,
    contactNumber: true,

    storeAddress: {
      select: {
        state: true,
        city: true,
        street: true,
        addressNumber: true,
      },
    },

    sellers: { select: { userId: true }, where: { active: true } },
  }

  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getAll(includeInactive: boolean) {
    const stores = await this._db.store.findMany({
      where: includeInactive ? undefined : { active: true },
      select: this._select,
    })
    return stores
  }

  async getById(
    id: number,
    includeInactive: boolean,
  ): Promise<IDbStore | null> {
    const store = await this._db.store.findUnique({
      where: includeInactive ? { id } : { id, active: true },
      select: this._select,
    })
    return store
  }

  async create(store: ISimpleStore, tx: ITransaction): Promise<IDbStore> {
    const newStore = await tx.store.create({
      data: { ...store },
      select: this._select,
    })
    return newStore
  }
}

const storeModel = new StoreModel(prisma)

export default storeModel
