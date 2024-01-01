import z from 'zod'
import { storeAddressSchema } from '.'

const updateAddressSchema = z
  .object({
    state: storeAddressSchema.shape.state.optional(),
    city: storeAddressSchema.shape.city.optional(),
    street: storeAddressSchema.shape.street.optional(),
    addressNumber: storeAddressSchema.shape.addressNumber,
  })
  .strict()

export default updateAddressSchema
