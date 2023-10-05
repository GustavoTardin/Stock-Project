import { z } from 'zod';

const loginSchema = z.object({
  userName: z.string().min(3).refine((value) => value.trim().length > 0, {
    message: 'Nome é obrigatório',
  }),
  password: z.string().min(4).refine((value) => value.trim().length > 0, {
    message: 'Senha é obrigatória',
  }),
});

export default loginSchema;