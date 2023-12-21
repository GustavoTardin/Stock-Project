import { ISimpleStore } from '.'
import IStoreAddress from './IStoreAddress'

interface IDbStore extends ISimpleStore {
  id: number
  storeAddress: IStoreAddress | null
  sellers: { userId: number }[]
}

export default IDbStore
