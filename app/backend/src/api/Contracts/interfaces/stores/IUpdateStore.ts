import z from 'zod'
import { updateStoreSchema } from '../../zod/schemas/stores'

interface IUpdateStore extends z.infer<typeof updateStoreSchema> {}

export default IUpdateStore
