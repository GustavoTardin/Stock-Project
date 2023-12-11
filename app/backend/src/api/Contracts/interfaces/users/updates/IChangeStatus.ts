import z from 'zod'
import { ChangeStatusSchema } from '../../../zod/schemas/users'

interface IChangeStatus extends z.infer<typeof ChangeStatusSchema> {}

export default IChangeStatus
