import IProductDetails from './IProductDetails';
import IStore from './IStore';

interface IStoreDetails extends IStore {
  productDetails: { [productName: string]: IProductDetails } | Record<string, never>
}

export default IStoreDetails;