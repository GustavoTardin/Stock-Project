import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreService from '../Contracts/interfaces/services/IStoreService'
import {
  IDbStore,
  ICreateStore,
  IStoreModel,
  IStoreWithAddress,
  IStoreNames,
  IStoreAddress,
} from '../Contracts/interfaces/stores'
import { DomainFactory, DomainTypes, validateField } from '../Utils'
import {
  newStoreSchema,
  storeAddressSchema,
} from '../Contracts/zod/schemas/stores'
import Store from '../Domains/Store'
import prisma from '../database/prisma'
import AbstractService from './AbstractService'
import IStoreSellerModel from '../Contracts/interfaces/models/IStoreSellerModel'
import IUpdateStoreTables from '../Contracts/interfaces/stores/IUpdateStoreTables'
import updateStoreTablesSchema from '../Contracts/zod/schemas/stores/updateStoreTablesSchema'
import CustomError from '../Errors/CustomError'
import StatusCode from 'status-code-enum'

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
    const dbStore = await super.verifyIfExistsById(storeId, includeInactive)
    const { store, address } = validateField<IUpdateStoreTables>(
      updateStoreTablesSchema,
      data,
    )
    if (dbStore.storeAddress === null && address) {
      throw new CustomError(
        'Apenas depois de criar um endereço você poderá edita - lo.',
        StatusCode.ClientErrorBadRequest,
      )
    }
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

  async addAddress(storeId: number, address: unknown): Promise<Store> {
    const validatedAddress = validateField<IStoreAddress>(
      storeAddressSchema,
      address,
    )

    const includeInactive = false
    const store = await super.verifyIfExistsById(storeId, includeInactive)

    let updatedStore: IDbStore

    if (store.storeAddress !== null) {
      updatedStore = await this._model.updateById(
        storeId,
        undefined, // Valor onde valores de atualização da loja seriam passados
        validatedAddress,
      )
    } else {
      updatedStore = await this._model.addAddress(storeId, validatedAddress)
    }
    const domain = DomainFactory.createDomain<Store>(
      this.domainName,
      updatedStore as IDbStore,
    )
    return domain
  }
}

export default StoreService
