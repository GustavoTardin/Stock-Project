import { IDbStore, ICreateStore } from '../stores'
import IModel from './IModel'

interface IStoreModel extends IModel<IDbStore, ICreateStore> {}

export default IStoreModel
