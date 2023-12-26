import z from 'zod'
import { updateStoreSchema } from '.'
import updateAddressSchema from './updateAddressSchema'

const updateStoreTablesSchema = z
  .object({
    store: updateStoreSchema.optional(),
    address: updateAddressSchema.optional(),
  })
  .strict()

export default updateStoreTablesSchema
