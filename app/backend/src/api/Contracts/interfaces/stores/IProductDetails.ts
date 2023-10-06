import IProductHistory from './IProductHistory';

interface IProductDetails {
  productHistory: IProductHistory[],
  totalProfit: number,
  totalRevenue: number,
  totalQuantity: number,
}

export default IProductDetails;
