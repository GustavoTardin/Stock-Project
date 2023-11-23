import IStoreSeller from './IStoreSeller'
import ITransaction from '../prisma/ITransaction'

interface IStoreSellerModel {
  createStoreSellers(
    userId: number,
    storeIds: number[],
    tx: ITransaction,
  ): Promise<IStoreSeller[]>
}

export default IStoreSellerModel
