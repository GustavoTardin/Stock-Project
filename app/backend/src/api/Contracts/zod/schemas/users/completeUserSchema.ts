import { loginSchema, partialUserSchema } from '.'

const completeUserSchema = partialUserSchema.merge(loginSchema).strict()

export default completeUserSchema
