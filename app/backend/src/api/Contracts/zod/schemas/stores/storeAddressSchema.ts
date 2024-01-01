import { z } from 'zod'

const storeAddressSchema = z
  .object({
    state: z.string().min(2, {
      message: 'O estado da loja deve ter no mínimo 2 caracteres',
    }),
    city: z.string().min(3, {
      message: 'A cidade da loja deve ter no mínimo 3 caracteres',
    }),
    street: z.string().min(3, {
      message: 'A rua da loja deve ter no mínimo 3 caracteres',
    }),
    addressNumber: z.number().nullish(),
  })
  .strict()

export default storeAddressSchema
