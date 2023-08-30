import { IProductDetails, IStore } from '../interfaces/stores';

class Store {
  protected name: string;
  protected sellers: string[] | [];
  protected logoPath: string | null;
  protected productDetails?: { [productName: string]: IProductDetails } | Record<string, never>;

  constructor(store: IStore) {
    this.name = store.name;
    this.sellers = store.sellers;
    this.logoPath = store.logoPath;
    this.productDetails = store.productDetails;
  }
}

export default Store;