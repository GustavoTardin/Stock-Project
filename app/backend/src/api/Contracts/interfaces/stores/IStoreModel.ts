import { Store, StoreSellers } from '@prisma/client'

interface IStoreModel {
  getAll(): Promise<Store[]>
  checkIds(ids: number[]): Promise<boolean>
  createStoreSellers(
    userId: number,
    storeIds: number[],
  ): Promise<StoreSellers[]>
}

export default IStoreModel
