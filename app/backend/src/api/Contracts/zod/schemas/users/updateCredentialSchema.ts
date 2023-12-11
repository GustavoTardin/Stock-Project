import z from 'zod'

const updateCredentialSchema = z.object({
  id: z.number(),
  credentialId: z.number(),
})

export default updateCredentialSchema
