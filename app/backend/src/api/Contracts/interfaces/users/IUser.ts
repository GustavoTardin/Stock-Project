// import { Document } from 'mongoose';
// import { z } from 'zod';

import { Role } from '@prisma/client'
import ILoginUser from './reqBody/ILoginUser'

// import { userSchema } from '../../zod/schemas';
export default interface IUser extends ILoginUser {
  id: number
  credential: Role | { credentialName: string }
}
