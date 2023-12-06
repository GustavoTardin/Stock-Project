import z from 'zod'
import { changePasswordSchema } from '../../../zod/schemas/users'

interface IChangePassword extends z.infer<typeof changePasswordSchema> {}

export default IChangePassword
