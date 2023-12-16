import { StoreSeller } from '../../../Domains'

interface IStoreSellerService {
  createOrUpdateStoreSeller(data: unknown): Promise<StoreSeller[]>
}

export default IStoreSellerService
