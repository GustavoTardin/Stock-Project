import ITransaction from '../prisma/ITransaction'
import {
  IDbStore,
  ICreateStore,
  IStoreNames,
  IUpdateStore,
  IUpdateAddress,
  IStoreAddress,
} from '../stores'
import IModel from './IModel'

interface IStoreModel extends IModel<IDbStore, ICreateStore> {
  getNames(includeInactive: boolean): Promise<IStoreNames[]>
  create(
    store: ICreateStore,
    tx: ITransaction,
    address?: IStoreAddress,
  ): Promise<IDbStore>
  updateById(
    id: number,
    data?: IUpdateStore,
    address?: IUpdateAddress,
    tx?: ITransaction,
  ): Promise<IDbStore>
  addAddress(storeId: number, address: IStoreAddress): Promise<IDbStore>
}

export default IStoreModel
