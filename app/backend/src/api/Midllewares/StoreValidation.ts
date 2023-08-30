import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/CustomError';

class StoreValidation {
  static nameRequired = (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.file);
    const { name } = req.body;
    if (name) {
      next();
    } else {
      next(new CustomError('name field must be filled', '400'));
    }
  };

  static sellersRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { sellers } = req.body;
    if (sellers) {
      req.body.sellers = JSON.parse(sellers);
      next();
    } else {
      next(new CustomError('sellers field must be filled', '400'));
    }
  };
}

export default StoreValidation;