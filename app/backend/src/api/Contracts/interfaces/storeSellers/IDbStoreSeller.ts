import z from 'zod'
import storeSellerSchema from '../../zod/schemas/storeSellers/storeSellerSchema'

type IDbStoreSeller = z.infer<typeof storeSellerSchema.element> & {
  createdAt: Date
  updatedAt: Date
}

export default IDbStoreSeller
