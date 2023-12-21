import {
  IDbStore,
  ISimpleStore,
  IStoreModel,
} from '../Contracts/interfaces/stores'
import Store from '../Domains/Store'
import DomainTypes from '../Utils/DomainTypes'
import AbstractService from './AbstractService'

class StoreService extends AbstractService<
  Store,
  IDbStore,
  ISimpleStore,
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
