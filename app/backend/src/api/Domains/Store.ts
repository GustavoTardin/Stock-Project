import { IDbStore, IStoreAddress } from '../Contracts/interfaces/stores'

class Store {
  protected id: number
  protected storeName: string
  protected contactNumber: string
  protected instagram: string | undefined
  protected sellers: number[] | undefined
  protected address: IStoreAddress | undefined

  constructor(store: IDbStore) {
    this.id = store.id
    this.storeName = store.storeName
    this.contactNumber = store.contactNumber
    if (store.instagram) this.instagram = store.instagram
    if (store.sellers.length > 0) {
      const sellersId = store.sellers.map((e) => e.userId)
      this.sellers = sellersId
    }
    if (store.storeAddress) this.address = store.storeAddress
  }
}

export default Store
