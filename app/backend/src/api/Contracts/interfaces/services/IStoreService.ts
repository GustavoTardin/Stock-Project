import Store from '../../../Domains/Store'
import { IDbStore, IStoreNames } from '../stores'
import IService from './IService'

interface IStoreService extends IService<Store, IDbStore> {
  getNames(query: unknown): Promise<IStoreNames[]>
}

export default IStoreService
