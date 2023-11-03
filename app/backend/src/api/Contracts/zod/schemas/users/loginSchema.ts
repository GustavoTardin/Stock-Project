import { z } from 'zod'
import '../../zodConfig'

const loginSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'Nome de usuário é obrigatório',
    }),
  password: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'A senha é obrigatória',
    }),
})

export default loginSchema
