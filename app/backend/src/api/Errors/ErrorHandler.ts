/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import CustomError from './CustomError'
import StatusCode from 'status-code-enum'

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof CustomError && error.stack) {
      return res.status(+error.stack).json({ message: error.message })
    }
    res.status(StatusCode.ServerErrorInternal).json({
      message: 'Algum erro aconteceu no servidor, tente novamente mais tarde',
    })
  }
}

export default ErrorHandler
