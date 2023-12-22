import { z } from 'zod'
import newStoreSchema from '../../zod/schemas/stores/newStoreSchema'

interface ICreateStore extends z.infer<typeof newStoreSchema.shape.store> {}

export default ICreateStore
