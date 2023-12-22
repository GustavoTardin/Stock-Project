import { IStoreAddress } from '.'
import ICreateStore from './ICreateStore'

interface IStoreWithAddress {
  store: ICreateStore
  address?: IStoreAddress
}

export default IStoreWithAddress
