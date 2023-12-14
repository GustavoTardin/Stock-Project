import z from 'zod'
import ChangeStatusSchema from './changeStatusSchema'
import loginSchema from './loginSchema'

const changePasswordSchema = z.object({
  id: ChangeStatusSchema.shape.id,
  currentPassword: loginSchema.shape.password,
  newPassword: loginSchema.shape.password,
})

export default changePasswordSchema
