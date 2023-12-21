import { z } from 'zod'

const storeAddressSchema = z
  .object({
    state: z.string().min(2),
    city: z.string().min(3),
    street: z.string().min(3),
    addressNumber: z.number().nullish(),
  })
  .strict()

export default storeAddressSchema
