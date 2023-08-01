import ISizes from './ISizes';

export default interface IProduct {
  category: string,
  model: string,
  salePrice: number,
  sizes: ISizes[]
}