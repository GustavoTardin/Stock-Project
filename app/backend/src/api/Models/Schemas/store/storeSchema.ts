import { Schema } from 'mongoose';
import productDetailsSchema from './productDetailsSchema';
import { IStore } from '../../../interfaces/stores';

const storeSchema = new Schema<IStore>({
  name: { type: String, required: true },
  sellers: {
    type: [String],
    required: true,
    default: [],
    validate: {
      validator(sellers: string[]) {
        return sellers.length === 0 || sellers.every((seller) => typeof seller === 'string');
      },
      message: 'Sellers must be an array of strings or an empty array.',
    },
  },
  logoPath: { type: String, default: null },
  productDetails: {
    type: Map,
    of: productDetailsSchema,
    default: {},
    required: true,
  },
});

export default storeSchema;