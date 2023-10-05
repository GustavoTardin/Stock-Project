import { Schema } from 'mongoose';
import ISaleProduct from '../../interfaces/sales/ISaleProduct';

const saleProductSchema = new Schema<ISaleProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

saleProductSchema.virtual('profit').get(function (this: ISaleProduct) {
  return this.quantity * (this.price - this.cost);
});

saleProductSchema.virtual('revenue').get(function (this: ISaleProduct) {
  return this.quantity * this.price;
});

export default saleProductSchema;