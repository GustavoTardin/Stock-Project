import { z } from 'zod';
import IProductDetails from './IProductDetails';
import { newStoreSchema } from '../../zod/schemas/users';

interface IStore extends z.infer<typeof newStoreSchema>{
  productDetails?: { [productName: string]: IProductDetails } | Record<string, never>
}

export default IStore;