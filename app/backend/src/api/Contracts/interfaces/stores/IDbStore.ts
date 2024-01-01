import { ICreateStore } from '.'
import IStoreAddress from './IStoreAddress'

interface IDbStore extends ICreateStore {
  id: number
  storeAddress: IStoreAddress | null
  sellers: {
    user: { id: number; firstName: string; lastName: string | null }
  }[]
}

export default IDbStore
