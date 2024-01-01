import Store from '../../../Domains/Store'
import { IDbStore, IStoreNames } from '../stores'
import IService from './IService'

interface IStoreService extends IService<Store, IDbStore> {
  getNames(query: unknown): Promise<IStoreNames[]>
  updateById(storeId: number, data: unknown): Promise<Store>
}

export default IStoreService
