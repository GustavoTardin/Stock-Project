import z from 'zod'
import updateAddressSchema from '../../zod/schemas/stores/updateAddressSchema'

interface IUpdateAddress extends z.infer<typeof updateAddressSchema> {}

export default IUpdateAddress
