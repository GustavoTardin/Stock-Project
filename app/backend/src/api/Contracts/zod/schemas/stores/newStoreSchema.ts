import z from 'zod'
import { storeAddressSchema } from '.'

const newStoreSchema = z
  .object({
    store: z
      .object({
        storeName: z.string().min(3, {
          message: 'O nome da loja deve ter no mínimo 3 caracteres',
        }),
        contactNumber: z.string().min(10, {
          message: 'O número de contato deve ter no mínimo 10 caracteres',
        }),
        instagram: z
          .string()
          .min(3, {
            message: 'O instagram deve ter no mínimo 3 caracteres',
          })
          .nullish(),
      })
      .strict(),
    address: storeAddressSchema.optional(),
    sellers: z.array(z.number().min(1)).optional(),
  })
  .strict()

export default newStoreSchema
