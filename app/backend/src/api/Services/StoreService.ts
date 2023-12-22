import {
  IDbStore,
  ICreateStore,
  IStoreModel,
} from '../Contracts/interfaces/stores'
import Store from '../Domains/Store'
import DomainTypes from '../Utils/DomainTypes'
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

  create(): Promise<Store> {
    throw Error('not implemented')
  }
}

export default StoreService
