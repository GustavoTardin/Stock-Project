import { z } from 'zod'
import newStoreSchema from '../../zod/schemas/stores/newStoreSchema'

interface ISimpleStore extends z.infer<typeof newStoreSchema.shape.store> {}

export default ISimpleStore
