import { z } from 'zod'
import { completeUserSchema } from '../../zod/schemas/users'

interface ICompleteUser extends z.infer<typeof completeUserSchema> {
  id?: number
  stores?: number[]
}

export default ICompleteUser
