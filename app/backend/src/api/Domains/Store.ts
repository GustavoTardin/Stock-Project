import { IDbStore, IStoreAddress } from '../Contracts/interfaces/stores'

class Store {
  protected id: number
  protected storeName: string
  protected contactNumber: string
  protected instagram: string | undefined
  protected sellers: { userId: number; name: string }[] | undefined
  protected address: IStoreAddress | undefined

  constructor(store: IDbStore) {
    this.id = store.id
    this.storeName = store.storeName
    this.contactNumber = store.contactNumber
    if (store.instagram) this.instagram = store.instagram
    if (store.sellers.length > 0) {
      this.sellers = store.sellers.map(
        ({ user: { id, firstName, lastName } }) => ({
          userId: id,
          name: `${firstName}${lastName ? ` ${lastName}` : ''}`,
        }),
      )
    }
    if (store.storeAddress) this.address = store.storeAddress
  }
}

export default Store
