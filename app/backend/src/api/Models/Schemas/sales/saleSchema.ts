import { Schema } from 'mongoose';
import ISale from '../../../interfaces/sales/ISale';
import saleProductSchema from './saleProductSchema';

const saleSchema = new Schema<ISale>({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  products: { type: [saleProductSchema], required: true, _id: true },
});

export default saleSchema;