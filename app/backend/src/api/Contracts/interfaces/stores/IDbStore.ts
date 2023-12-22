import { ICreateStore } from '.'
import IStoreAddress from './IStoreAddress'

interface IDbStore extends ICreateStore {
  id: number
  storeAddress: IStoreAddress | null
  sellers: { userId: number }[]
}

export default IDbStore
