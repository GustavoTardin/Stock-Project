import { z } from 'zod';

const loginSchema = z.object({
  userName: z.string().min(3),
  password: z.string().min(4),
});

export default loginSchema;