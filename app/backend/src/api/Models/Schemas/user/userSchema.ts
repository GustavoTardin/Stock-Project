import { Schema } from 'mongoose';
import IUser from '../../../interfaces/users/IUser';

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  credential: { type: String, required: true },
  stores: { type: [String] },
});

export default userSchema;