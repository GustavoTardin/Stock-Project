import { Document } from 'mongoose';
import ISaleProduct from './ISaleProduct';

interface ISale extends Document {
  month: string,
  year: number,
  products: ISaleProduct[]
}

export default ISale;