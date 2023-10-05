import { Document } from 'mongoose';
import { z } from 'zod';

export default interface IUser extends Document {
  id?: string,
  userName: string,
  credential: string,
  password: string,
  stores?: string[],
}
