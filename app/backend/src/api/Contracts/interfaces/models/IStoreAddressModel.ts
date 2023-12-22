import ITransaction from '../prisma/ITransaction'
import IDbStoreAddress from '../storeAddress/IDbStoreAddress'
import { IStoreAddress } from '../stores'

interface IStoreAddressModel {
  create(
    storeId: number,
    address: IStoreAddress,
    tx: ITransaction,
  ): Promise<IDbStoreAddress>
}

export default IStoreAddressModel
