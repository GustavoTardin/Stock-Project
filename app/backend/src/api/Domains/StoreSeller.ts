import IStoreSeller from '../Contracts/interfaces/storeSellers/IDbStoreSeller'

class StoreSeller {
  protected userId: number
  protected storeId: number
  protected active: boolean

  constructor(storeSeller: IStoreSeller) {
    this.userId = storeSeller.userId
    this.storeId = storeSeller.storeId
    this.active = storeSeller.active
  }
}

export default StoreSeller
