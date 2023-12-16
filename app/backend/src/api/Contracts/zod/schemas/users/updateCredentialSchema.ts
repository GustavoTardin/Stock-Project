import z from 'zod'
import { ChangeStatusSchema, partialUserSchema } from '.'

const updateCredentialSchema = z.object({
  id: ChangeStatusSchema.shape.id,
  credentialId: partialUserSchema.shape.credentialId,
})

export default updateCredentialSchema
