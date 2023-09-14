import { Schema } from 'mongoose';
import ProductHistorySchema from './productHistorySchema';
import { IProductDetails } from '../../../interfaces/stores';

const productDetailsSchema = new Schema<IProductDetails>({
  productHistory: [ProductHistorySchema],
});

productDetailsSchema.virtual('totalProfit').get(function (this: IProductDetails) {
  return this.productHistory.reduce((
    totalProfit,
    productHistory,
  ) => totalProfit + productHistory.profit, 0);
});

productDetailsSchema.virtual('totalRevenue').get(function (this: IProductDetails) {
  return this.productHistory.reduce((
    totalRevenue,
    productHistory,
  ) => totalRevenue + productHistory.revenue, 0);
});

productDetailsSchema.virtual('totalQuantity').get(function (this: IProductDetails) {
  return this.productHistory.reduce((
    totalQuantity,
    productHistory,
  ) => totalQuantity + productHistory.quantity, 0);
});

export default productDetailsSchema;