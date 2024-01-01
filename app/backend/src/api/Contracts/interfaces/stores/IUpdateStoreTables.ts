import z from 'zod'
import updateStoreTablesSchema from '../../zod/schemas/stores/updateStoreTablesSchema'

interface IUpdateStoreTables extends z.infer<typeof updateStoreTablesSchema> {}

export default IUpdateStoreTables
