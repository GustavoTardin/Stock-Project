import { Document } from 'mongoose';
import IShippedProducts from './IShippedProducts';

interface IStore extends Document {
  name: string,
  sellers: string[],
  shippedProducts: { [productName: string]: IShippedProducts }
}

export default IStore;