import { Types } from 'mongoose';

export default interface IToken {
  id: Types.ObjectId,
  userName: string,
  credential: string,
  stores?: string[]
}
