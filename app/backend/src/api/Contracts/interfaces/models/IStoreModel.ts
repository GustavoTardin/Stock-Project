import { IDbStore, ISimpleStore } from '../stores'
import IModel from './IModel'

interface IStoreModel extends IModel<IDbStore, ISimpleStore> {}

export default IStoreModel
