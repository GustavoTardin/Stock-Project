import ITimeStamp from '../ITimeStamp'
import { IStoreAddress } from '../stores'

interface IDbStoreAddress extends IStoreAddress, ITimeStamp {
  id: number
  storeId: number
}

export default IDbStoreAddress
