import ISizes from './ISizes';

export default interface IProduct {
  id?: number,
  category: string,
  model: string,
  salePrice: number,
  sizes: ISizes[]
}