import { Document } from 'mongoose';

export default interface IUser extends Document {
  id?: string,
  userName: string,
  credential: string,
  stores: string[],
  password: string,
}