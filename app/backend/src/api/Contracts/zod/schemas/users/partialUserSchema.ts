import { z } from 'zod'
import '../../zodConfig'
import { Role } from '@prisma/client'

const partialUserSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' }),
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
    }),
  // stores: z.array(z.number()).optional(),
})

export default partialUserSchema
