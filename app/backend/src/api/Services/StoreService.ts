import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import {
  IDbStore,
  ICreateStore,
  IStoreModel,
  IStoreWithAddress,
} from '../Contracts/interfaces/stores'
import { newStoreSchema } from '../Contracts/zod/schemas/stores'
import Store from '../Domains/Store'
import DomainFactory from '../Utils/DomainFactory'
import DomainTypes from '../Utils/DomainTypes'
import validateField from '../Utils/serviceValidation'
import prisma from '../database/prisma'
import AbstractService from './AbstractService'

class StoreService extends AbstractService<
  Store,
  IDbStore,
  ICreateStore,
  IStoreModel
> {
  constructor(storeModel: IStoreModel) {
    super(storeModel, DomainTypes.STORE)
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
            await this.storeAddressModel.create(id, address, tx as ITransaction)
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
}

export default StoreService
