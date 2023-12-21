import Store from '../../../Domains/Store'
import { IDbStore } from '../stores'
import IService from './IService'

interface IStoreService extends IService<Store, IDbStore> {}

export default IStoreService
