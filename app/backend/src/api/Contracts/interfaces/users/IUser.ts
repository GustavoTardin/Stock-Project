// import { Document } from 'mongoose';
// import { z } from 'zod';

import { Role } from '@prisma/client'

// import { userSchema } from '../../zod/schemas';
export default interface IUser {
  id: number
  nickName: string
  credential: Role
}
