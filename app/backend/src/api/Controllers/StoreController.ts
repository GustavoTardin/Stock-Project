import IStoreService from '../Contracts/interfaces/services/IStoreService'
import { IDbStore } from '../Contracts/interfaces/stores'
import Store from '../Domains/Store'
import AbstractController from './AbstractController'

class StoreController extends AbstractController<
  Store,
  IDbStore,
  IStoreService
> {}

export default StoreController
