import IProduct from '../Contracts/interfaces/products/IProduct';
import ISizes from '../Contracts/interfaces/products/ISizes';

class Product {
  protected _category: string;
  protected _model: string;
  protected _salePrice: number;
  protected _sizes: ISizes[];

  constructor(product: IProduct) {
    this._category = product.category;
    this._model = product.model;
    this._salePrice = product.salePrice;
    this._sizes = product.sizes;
  }

  get category(): string {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
  }

  get model(): string {
    return this._model;
  }

  set model(model: string) {
    this._model = model;
  }

  get salePrice(): number {
    return this._salePrice;
  }

  set salePrice(salePrice: number) {
    this._salePrice = salePrice;
  }

  get sizes(): ISizes[] {
    return this._sizes;
  }

  set sizes(sizes: ISizes[]) {
    this._sizes = sizes;
  }
}

export default Product;
