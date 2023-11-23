import { StoreSellers } from '@prisma/client'
import ITransaction from '../prisma/ITransaction'
import { ISimpleStore } from '.'

interface IStoreModel {
  getAll(): Promise<ISimpleStore[]>
  findById(id: number): Promise<ISimpleStore | null>
  createStoreSellers(
    userId: number,
    storeIds: number[],
    tx: ITransaction,
  ): Promise<StoreSellers[]>
}

export default IStoreModel
