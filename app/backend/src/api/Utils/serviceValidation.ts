import { z } from 'zod'
import ZodValidation from '../Contracts/zod/ZodValidation'

const validateField = <T>(zodSchema: z.ZodType, obj: unknown): T => {
  ZodValidation.validateData(zodSchema, obj)
  return obj as T
}

export default validateField
