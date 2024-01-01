import { IStoreSeller } from '../Contracts/interfaces/storeSellers/IDbStoreSeller'

class StoreSeller {
  protected userId: number
  protected storeId: number
  protected active: boolean

  constructor(storeSeller: IStoreSeller) {
    this.userId = storeSeller[0].userId
    this.storeId = storeSeller[0].storeId
    this.active = storeSeller[0].active
  }
}

export default StoreSeller
