import { z } from 'zod'
import '../../zodConfig'

const selfUpdateUserSchema = z
  .object({
    nickName: z
      .string()
      .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
      .refine((value) => value.trim().length > 0, {
        message: 'Nome de usuário é obrigatório',
      })
      .optional(),
    firstName: z
      .string()
      .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
      .optional(),
    lastName: z
      .string()
      .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
      .optional(),
  })
  .strict('Só é possível atualizar nome, sobrenome ou login do usuário.')

export default selfUpdateUserSchema
