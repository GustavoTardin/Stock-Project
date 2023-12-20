import z from 'zod'

const ChangeStatusSchema = z.object({
  id: z.number().min(1),
  active: z.boolean(),
})

export default ChangeStatusSchema
