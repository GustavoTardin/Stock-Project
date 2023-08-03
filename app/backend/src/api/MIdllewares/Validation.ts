import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/CustomError';

class Validation {
  static usernameRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { userName } = req.body;
    if (userName) {
      next();
    } else {
      next(new CustomError('userName field must be filled', '400'));
    }
  };

  static userPasswordRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (password) {
      next();
    } else {
      next(new CustomError('password field must be filled', '400'));
    }
  };
}

export default Validation;