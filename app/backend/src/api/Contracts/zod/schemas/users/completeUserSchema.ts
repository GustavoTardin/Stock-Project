import { loginSchema, partialUserSchema } from '.'

const completeUserSchema = partialUserSchema.merge(loginSchema)

export default completeUserSchema
