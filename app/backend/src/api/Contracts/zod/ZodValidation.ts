import { z } from 'zod'
import CustomError from '../../Errors/CustomError'
import StatusCode from 'status-code-enum'

class ZodValidation {
  static validateData(schema: z.ZodType, data: unknown) {
    try {
      schema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0]
        if (firstError.message === 'Required') {
          firstError.message = `Campo ${firstError.path[0]} é obrigatório!!`
        }
        throw new CustomError(
          firstError.message,
          StatusCode.ClientErrorBadRequest,
        )
      } else {
        throw error
      }
    }
  }
}

export default ZodValidation
