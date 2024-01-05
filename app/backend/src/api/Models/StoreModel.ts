import { PrismaClient } from '@prisma/client'
import IStoreModel from '../Contracts/interfaces/models/IStoreModel'
import {
  IDbStore,
  ICreateStore,
  IStoreNames,
  IUpdateStore,
  IStoreAddress,
} from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
class StoreModel implements IStoreModel {
  private _db: PrismaClient
  private _select = {
    id: true,
    storeName: true,
    contactNumber: true,
    instagram: true,

    storeAddress: {
      select: {
        state: true,
        city: true,
        street: true,
        addressNumber: true,
      },
    },

    sellers: {
      where: { active: true },
      select: {
        user: { select: { firstName: true, lastName: true, id: true } },
      },
    },
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

  async getNames(includeInactive: boolean): Promise<IStoreNames[]> {
    const storeNames = await this._db.store.findMany({
      where: includeInactive ? undefined : { active: true },
      select: { id: true, storeName: true },
    })
    return storeNames
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

  async create(
    store: ICreateStore,
    tx: ITransaction,
    address?: IStoreAddress,
  ): Promise<IDbStore> {
    const newStore = await tx.store.create({
      data: address ? { ...store, storeAddress: { create: address } } : store,
      select: this._select,
    })
    return newStore
  }

  async updateById(
    id: number,
    data?: IUpdateStore,
    address?: IStoreAddress,
    tx?: ITransaction,
  ): Promise<IDbStore> {
    const updatedStore = await (tx || this._db).store.update({
      where: { id },
      data: {
        ...data,
        storeAddress: address
          ? {
              update: { where: { storeId: id }, data: { ...address } },
            }
          : undefined,
      },
      select: this._select,
    })
    return updatedStore
  }

  async updateStatusById(id: number, active: boolean): Promise<IDbStore> {
    const updatedStore = await this._db.store.update({
      where: { id },
      data: { active },
      select: this._select,
    })
    return updatedStore
  }

  async addAddress(storeId: number, address: IStoreAddress): Promise<IDbStore> {
    const updatedStore = await this._db.storeAddress.create({
      data: { storeId, ...address },
      select: {
        store: { select: this._select },
      },
    })
    const IDbStoreFormat = {
      storeAddress: updatedStore.store.storeAddress,
      id: updatedStore.store.id,
      storeName: updatedStore.store.storeName,
      contactNumber: updatedStore.store.contactNumber,
      instagram: updatedStore.store.instagram,
      sellers: updatedStore.store.sellers,
    }
    return IDbStoreFormat
  }
}

const storeModel = new StoreModel(prisma)

export default storeModel
