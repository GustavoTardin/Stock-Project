import z from 'zod'

const changePasswordSchema = z.object({
  id: z.number(),
  password: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'A senha é obrigatória',
    }),
  newPassword: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'A senha é obrigatória',
    }),
})

export default changePasswordSchema
