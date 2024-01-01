import { z } from 'zod'
import { storeAddressSchema } from '../../zod/schemas/stores'

interface IStoreAddress extends z.infer<typeof storeAddressSchema> {}

export default IStoreAddress
