import z from 'zod'
import { newStoreSchema } from '.'

const updateStoreSchema = z
  .object({
    storeName: newStoreSchema.shape.store.shape.storeName.optional(),
    contactNumber: newStoreSchema.shape.store.shape.contactNumber.optional(),
    instagram: newStoreSchema.shape.store.shape.instagram,
    active: z.boolean().optional(),
  })
  .strict()

export default updateStoreSchema
