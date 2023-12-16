import { z } from 'zod'
import '../../zodConfig'
import { loginSchema, partialUserSchema } from '.'

const selfUpdateUserSchema = z
  .object({
    nickName: loginSchema.shape.nickName.optional(),
    firstName: partialUserSchema.shape.firstName.optional(),
    lastName: partialUserSchema.shape.lastName, // já é optional no schema reutilizado.
  })
  .strict('Só é possível atualizar nome, sobrenome ou login do usuário.')
export default selfUpdateUserSchema
