import { ISimpleStore, IStoreAdress } from '.'

interface ICompleteStore extends ISimpleStore, IStoreAdress {
  sellers: string[]
}

export default ICompleteStore
