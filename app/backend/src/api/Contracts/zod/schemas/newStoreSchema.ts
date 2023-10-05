import { z } from 'zod';

const newStoreSchema = z.object({
  name: z.string().min(4).required(),
  logoPath: z.string().nullable(),
});

export default newStoreSchema;