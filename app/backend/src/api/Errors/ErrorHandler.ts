import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof Error && error.stack) {
      return res.status(+error.stack).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

export default ErrorHandler;