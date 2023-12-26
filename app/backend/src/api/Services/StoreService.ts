import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreService from '../Contracts/interfaces/services/IStoreService'
import {
  IDbStore,
  ICreateStore,
  IStoreModel,
  IStoreWithAddress,
  IStoreNames,
} from '../Contracts/interfaces/stores'
import { DomainFactory, DomainTypes, validateField } from '../Utils'
import { newStoreSchema } from '../Contracts/zod/schemas/stores'
import Store from '../Domains/Store'
import prisma from '../database/prisma'
import AbstractService from './AbstractService'
import IStoreSellerModel from '../Contracts/interfaces/models/IStoreSellerModel'
import IUpdateStoreTables from '../Contracts/interfaces/stores/IUpdateStoreTables'
import updateStoreTablesSchema from '../Contracts/zod/schemas/stores/updateStoreTablesSchema'

class StoreService
  extends AbstractService<Store, IDbStore, ICreateStore, IStoreModel>
  implements IStoreService
{
  private _storeSellersModel: IStoreSellerModel
  constructor(storeModel: IStoreModel, storeSellersModel: IStoreSellerModel) {
    super(storeModel, DomainTypes.STORE)
    this._storeSellersModel = storeSellersModel
  }

  async create(data: unknown): Promise<Store> {
    const { store, address, sellers } = validateField<IStoreWithAddress>(
      newStoreSchema,
      data,
    )
    const newStoreId = await prisma.$transaction(
      async (tx): Promise<number> => {
        try {
          const { id: storeId } = await this._model.create(
            store,
            tx as ITransaction,
            address || undefined,
          )
          if (sellers) {
            await Promise.all(
              sellers.map((userId) =>
                this._storeSellersModel.createOrUpdateStoreSeller(
                  userId,
                  storeId,
                  tx as ITransaction,
                ),
              ),
            )
          }
          return storeId
        } catch (error) {
          console.log(error)
          throw error
        }
      },
    )
    const includeInactive = false
    const newStore = await this._model.getById(newStoreId, includeInactive)
    const domain = DomainFactory.createDomain<Store>(this.domainName, newStore)
    return domain
  }

  async getNames(query: unknown): Promise<IStoreNames[]> {
    const includeInactive = query === 'true'
    const storeNames = await this._model.getNames(includeInactive)
    return storeNames
  }

  async updateById(storeId: number, data: unknown): Promise<Store> {
    const includeInactive = true
    await super.verifyIfExistsById(storeId, includeInactive)
    const { store, address } = validateField<IUpdateStoreTables>(
      updateStoreTablesSchema,
      data,
    )
    const updatedStore = await prisma.$transaction(
      async (tx): Promise<IDbStore> => {
        try {
          const updatedStore = await this._model.updateById(
            storeId,
            store || undefined,
            address || undefined,
            tx as ITransaction,
          )
          return updatedStore
        } catch (err) {
          console.log(err)
          throw err
        }
      },
    )
    const domain = DomainFactory.createDomain<Store>(
      this.domainName,
      updatedStore as IDbStore,
    )
    return domain
  }
}

export default StoreService
