import { z } from 'zod';

const newStoreSchema = z.object({
  name: z.string().min(4),
  logoPath: z.string().nullable(),
});

export default newStoreSchema;