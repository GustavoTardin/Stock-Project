import IStoreSeller from './IStoreSeller'
import ITransaction from '../prisma/ITransaction'

interface IStoreSellerModel {
  createStoreSeller(
    userId: number,
    storeId: number,
    tx?: ITransaction | null,
  ): Promise<IStoreSeller>
  getBySellerId(userId: number): Promise<IStoreSeller[] | null>
  getByStoreId(storeId: number): Promise<IStoreSeller[] | null>
  deleteBySellerId(
    userId: number,
    transaction?: ITransaction | null,
  ): Promise<void>
  deleteByStoreId(
    storeId: number,
    transaction?: ITransaction | null,
  ): Promise<void>
}

export default IStoreSellerModel
