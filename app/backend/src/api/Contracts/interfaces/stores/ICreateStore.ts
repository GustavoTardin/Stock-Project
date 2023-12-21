import { ISimpleStore } from '.'
import IStoreAddress from './IStoreAddress'

interface ICreateStore {
  store: ISimpleStore
  address?: IStoreAddress
}

export default ICreateStore
