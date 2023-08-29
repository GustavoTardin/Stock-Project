import { Document } from 'mongoose';

interface IStore extends Document {
  name: string,
  sellers: string[],
  logoPath: string | null,
}

export default IStore;