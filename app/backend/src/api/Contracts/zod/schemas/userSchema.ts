import { z } from 'zod';

const validCredentialOptions = ['Lojista', 'Estoquista', 'Administrador'] as const;

const newStoreSchema = z.object({
  name: z.string().min(4),
  logoPath: z.string().nullable(),
  credential: z.enum(validCredentialOptions),
});

export default newStoreSchema;