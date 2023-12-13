import z from 'zod'
import updateCredentialSchema from '../../../zod/schemas/users/updateCredentialSchema'

interface IChangeUserCredential
  extends z.infer<typeof updateCredentialSchema> {}

export default IChangeUserCredential
