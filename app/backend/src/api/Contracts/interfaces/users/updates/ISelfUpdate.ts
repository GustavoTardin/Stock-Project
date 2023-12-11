import z from 'zod'
import selfUpdateUserSchema from '../../../zod/schemas/users/selfUpdateUserSchema'

interface ISelfUpdate extends z.infer<typeof selfUpdateUserSchema> {}

export default ISelfUpdate
