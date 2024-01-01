import z from 'zod'
import storeSellerSchema from '../../zod/schemas/storeSellers/storeSellerSchema'

export type IStoreSeller = z.infer<typeof storeSellerSchema>

type IDbStoreSeller = IStoreSeller & {
  createdAt: Date
  updatedAt: Date
}

export default IDbStoreSeller
