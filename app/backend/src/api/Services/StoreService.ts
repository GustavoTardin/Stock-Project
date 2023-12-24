import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreService from '../Contracts/interfaces/services/IStoreService'
import { IStoreAddressModel } from '../Contracts/interfaces/storeAddress'
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

class StoreService
  extends AbstractService<Store, IDbStore, ICreateStore, IStoreModel>
  implements IStoreService
{
  private _storeAddressModel: IStoreAddressModel
  constructor(storeModel: IStoreModel, storeAddressModel: IStoreAddressModel) {
    super(storeModel, DomainTypes.STORE)
    this._storeAddressModel = storeAddressModel
  }

  async create(data: unknown): Promise<Store> {
    const { store, address } = validateField<IStoreWithAddress>(
      newStoreSchema,
      data,
    )
    const newStoreId = await prisma.$transaction(
      async (tx): Promise<number> => {
        try {
          const { id } = await this._model.create(store, tx as ITransaction)
          if (address) {
            await this._storeAddressModel.create(
              id,
              address,
              tx as ITransaction,
            )
          }
          return id
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
}

export default StoreService
