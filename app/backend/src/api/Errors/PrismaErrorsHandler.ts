import { Prisma } from '@prisma/client'
import CustomError from './CustomError'
import StatusCode from 'status-code-enum'

class PrismaErrorHandler {
  static handleErrors(error: Error): CustomError | Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const convertedError = this.handleClientKnownRequestError(error)
      return convertedError
    }
    return error
  }

  private static handleClientKnownRequestError(
    error: Prisma.PrismaClientKnownRequestError,
  ): CustomError {
    if (error.code === 'P2002') {
      const convertedMessage = `O valor do campo ${error.meta?.target} já está em uso no banco de dados`
      const customError = new CustomError(
        convertedMessage,
        StatusCode.ClientErrorConflict,
      )
      return customError
    }
    if (error.code === 'P2003') {
      const convertedMessage = `o valor no campo ${error.meta?.field_name} não existe`
      const customError = new CustomError(
        convertedMessage,
        StatusCode.ClientErrorNotFound,
      )
      return customError
    }
    return new CustomError(
      'Erro do tipo PrismaClientKnownRequestError não tratado',
      StatusCode.ServerErrorInternal,
    )
  }
}

export default PrismaErrorHandler
