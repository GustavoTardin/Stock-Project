import { Schema } from 'mongoose';
import productDetailsSchema from './productDetailsSchema';
import { IStore } from '../../../interfaces/stores';

const storeSchema = new Schema<IStore>({
  name: { type: String, required: true },
  logoPath: { type: String, default: null },
  productDetails: {
    type: Map,
    of: productDetailsSchema,
    default: {},
    required: true,
  },
});

export default storeSchema;