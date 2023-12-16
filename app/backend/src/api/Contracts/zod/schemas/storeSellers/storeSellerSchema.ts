import z from 'zod'
import { ChangeStatusSchema } from '../users'

const storeSellerSchema = z.array(
  z.object({
    userId: ChangeStatusSchema.shape.id,
    storeId: ChangeStatusSchema.shape.id,
    active: ChangeStatusSchema.shape.active,
  }),
)

export default storeSellerSchema
