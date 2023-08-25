import { Document } from 'mongoose';
import IProductDetails from './IProductDetails';

interface IStore extends Document {
  name: string,
  sellers: string[],
  logoPath: string | null,
  productDetails: { [productName: string]: IProductDetails }
}

export default IStore;