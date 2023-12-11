import z from 'zod'

const ChangeStatusSchema = z.object({
  id: z.number(),
  active: z.boolean(),
})

export default ChangeStatusSchema
