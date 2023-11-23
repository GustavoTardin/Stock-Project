import { Store, StoreSellers } from '@prisma/client'
import ITransaction from '../prisma/ITransaction'

interface IStoreModel {
  getAll(): Promise<Store[]>
  checkIds(ids: number[]): Promise<boolean>
  createStoreSellers(
    userId: number,
    storeIds: number[],
    tx: ITransaction,
  ): Promise<StoreSellers[]>
}

export default IStoreModel
