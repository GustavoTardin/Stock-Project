import { z } from 'zod';
import '../zodConfig';

const newStoreSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Nome da loja deve ter no mínimo 4 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'Nome de usuário é obrigatório',
    }),
  logoPath: z.string().nullable(),
});

export default newStoreSchema;