import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/CustomError';
import Jwt from '../Auth/Jwt';

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

  static credentialRequired = (req: Request, res: Response, next: NextFunction) => { 
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json('Usuário não autorizado');

    try {
      const decryptedToken = Jwt.decryptToken(authorization);
      if (decryptedToken.credential !== 'Administrador') {
        throw new CustomError('Apenas administradores podem criar lojas', '401');
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}

export default StoreValidation;