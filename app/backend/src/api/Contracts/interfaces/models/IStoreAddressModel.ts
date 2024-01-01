import ITransaction from '../prisma/ITransaction'
import IDbStoreAddress from '../storeAddress/IDbStoreAddress'
import { IStoreAddress, IUpdateAddress } from '../stores'

interface IStoreAddressModel {
  create(
    storeId: number,
    address: IStoreAddress,
    tx: ITransaction,
  ): Promise<IDbStoreAddress>
  updateByStoreId(
    storeId: number,
    updatedAddress: IUpdateAddress,
    tx?: ITransaction,
  ): Promise<void>
}

export default IStoreAddressModel
