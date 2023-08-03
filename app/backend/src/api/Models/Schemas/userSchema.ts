import { Schema } from 'mongoose';
import IUser from '../../interfaces/users/IUser';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  credential: { type: String, required: true },
  store: { type: [String], required: true },
});

export default userSchema;