import { z } from 'zod'
import '../../zodConfig'
import { Role } from '@prisma/client'

const partialUserSchema = z.object({
  nickName: z
    .string()
    .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'Nome de usuário é obrigatório',
    })
    .optional(),
  password: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'A senha é obrigatória',
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
  credentialId: z
    .number()
    .refine((value) => value > 0 && value <= Object.values(Role).length, {
      message: `O campo cargo é obrigatório e deve ser uma das opções: ${Object.values(
        Role,
      ).join(', ')}`,
    })
    .optional(),
  stores: z.array(z.number()).optional(),
})

export default partialUserSchema
