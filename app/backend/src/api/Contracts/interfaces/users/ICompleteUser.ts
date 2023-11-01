import { z } from 'zod'
import newUserSchema from '../../zod/schemas/userSchema'

interface ICompleteUser extends z.infer<typeof newUserSchema> {
  id?: number
}

export default ICompleteUser
