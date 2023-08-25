import { Schema } from 'mongoose';
import IProductHistory from '../../../interfaces/stores/IProductHistory';

const ProductHistorySchema = new Schema<IProductHistory>({
  quantity: Number,
  buyPrice: Number,
  salePrice: Number,
});

ProductHistorySchema.virtual('profit').get(function (this: IProductHistory) {
  return this.quantity * (this.salePrice - this.buyPrice);
});

ProductHistorySchema.virtual('revenue').get(function (this: IProductHistory) {
  return this.quantity * this.salePrice;
});

export default ProductHistorySchema;