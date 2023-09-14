import { Document } from 'mongoose';
import IProductDetails from './IProductDetails';

interface IStore extends Document {
  name: string,
  logoPath: string | null,
  productDetails?: { [productName: string]: IProductDetails } | Record<string, never>
}

export default IStore;