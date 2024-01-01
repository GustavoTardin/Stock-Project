import { IStoreSeller } from '../storeSellers/IDbStoreSeller'
import ITransaction from '../prisma/ITransaction'

interface IStoreSellerModel {
  createOrUpdateStoreSeller(
    userId: number,
    storeId: number,
    tx?: ITransaction | null,
    active?: boolean,
  ): Promise<IStoreSeller>
  getBySellerId(userId: number): Promise<IStoreSeller[] | null>
  getByStoreId(storeId: number): Promise<IStoreSeller[] | null>
  updateBySellerId(
    userId: number,
    active: boolean,
    transaction?: ITransaction | null,
  ): Promise<void>
  deleteByStoreId(
    storeId: number,
    transaction?: ITransaction | null,
  ): Promise<void>
}

export default IStoreSellerModel
