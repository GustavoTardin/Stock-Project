import { z } from 'zod';
import '../zodConfig';

const validCredentialOptions = ['Lojista', 'Estoquista', 'Administrador'] as const;

const newUserSchema = z.object({
  userName: z
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
  credential: z
    .enum(validCredentialOptions, {
      errorMap: () => (
        { 
          message: 'O campo função é obrigatório e deve ser Lojista, Estoquista ou Administrador' }
      ),
    })
    .refine((value) => value.trim().length > 0, {
      message: 'A função é obrigatória',
    }),
  stores: z.array(z.string()).optional(),
});

export default newUserSchema;
