import { IDbStore, ICreateStore, IStoreNames } from '../stores'
import IModel from './IModel'

interface IStoreModel extends IModel<IDbStore, ICreateStore> {
  getNames(includeInactive: boolean): Promise<IStoreNames[]>
}

export default IStoreModel
