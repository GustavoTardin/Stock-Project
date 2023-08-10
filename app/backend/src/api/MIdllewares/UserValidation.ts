import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/CustomError';

class UserValidation {
  static usernameRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { userName } = req.body;
    if (userName) {
      next();
    } else {
      next(new CustomError('userName field must be filled', '400'));
    }
  };

  static passwordRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (password) {
      next();
    } else {
      next(new CustomError('password field must be filled', '400'));
    }
  };

  static credentialRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { credential } = req.body;
    if (credential) {
      next();
    } else {
      next(new CustomError('credential field must be filled', '400'));
    }
  };

  static storeRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { store } = req.body;
    if (store) {
      next();
    } else {
      next(new CustomError('store field must be filled', '400'));
    }
  };
}

export default UserValidation;