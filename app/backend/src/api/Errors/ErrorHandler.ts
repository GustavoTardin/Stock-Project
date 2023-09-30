import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof CustomError && error.stack) {
      return res.status(+error.stack).json({ message: error.message });
    }
    return res.status(500).json({ 
      message: 'Algum erro aconteceu no servidor, tente novamente mais tarde' });
  }
}

export default ErrorHandler;