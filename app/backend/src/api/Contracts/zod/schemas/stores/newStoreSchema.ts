import z from 'zod'
import { storeAddressSchema } from '.'

const newStoreSchema = z
  .object({
    store: z
      .object({
        storeName: z.string().min(3),
        contactNumber: z.string().min(10),
        instagram: z.string().min(3).nullish(),
      })
      .strict(),
    address: storeAddressSchema.optional(),
  })
  .strict()

export default newStoreSchema
