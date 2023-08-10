import { Schema } from 'mongoose';
import IStore from '../../interfaces/stores/IStore';

const storeSchema = new Schema<IStore>({
  name: { type: String, required: true },
  sellers: {
    type: [String],
    required: true,
    validate: {
      validator(sellers: string[]) {
        return sellers.length === 0 || sellers.every((seller) => typeof seller === 'string');
      },
      message: 'Sellers must be an array of strings or an empty array.',
    },
  },
  shippedProducts: {
    type: Map,
    of: {
      price: Number,
      quantity: Number,
      totalMovement: Number,
    },
  },
});

export default storeSchema;