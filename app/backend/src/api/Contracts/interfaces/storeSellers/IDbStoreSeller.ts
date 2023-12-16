import z from 'zod'
import storeSellerSchema from '../../zod/schemas/storeSellers/storeSellerSchema'

type IDbStoreSeller = z.infer<typeof storeSellerSchema> & {
  createdAt: Date
  updatedAt: Date
}

export default IDbStoreSeller
