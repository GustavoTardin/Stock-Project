import { Document } from 'mongoose';
import { z } from 'zod';
import IProductDetails from './IProductDetails';
import { newStoreSchema } from '../../zod/schemas';

interface IStore extends z.infer<typeof newStoreSchema>, Document {
  productDetails?: { [productName: string]: IProductDetails } | Record<string, never>
}

export default IStore;