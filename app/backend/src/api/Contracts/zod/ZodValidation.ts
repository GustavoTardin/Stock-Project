import { z } from 'zod'
import CustomError from '../../Errors/CustomError'
import StatusCode from 'status-code-enum'
import TZod from './TZod'

class ZodValidation {
  static validateData(schema: z.ZodType, data: unknown) {
    try {
      schema.parse(data)
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        const firstError: TZod = error.errors[0] as TZod
        const field = firstError.path[0]
        const defaultMessage = firstError.message
        let errorMessage = ''
        if (firstError.message === 'Required') {
          errorMessage = `O campo ${field} é obrigatório!!`
        } else if (defaultMessage.split(' ')[0] === 'Expected') {
          errorMessage = `No campo ${field} esperava - se um(a) ${firstError.expected} e foi enviado um(a) ${firstError.received}`
        } else {
          errorMessage = firstError.message
        }
        throw new CustomError(errorMessage, StatusCode.ClientErrorBadRequest)
      } else {
        throw error
      }
    }
  }
}

export default ZodValidation
