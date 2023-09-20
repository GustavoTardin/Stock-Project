/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/CustomError';
import Jwt from '../Auth/Jwt';

class TokenValidation {
  static tokenRequired = (requiredCredential = '') =>
    (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json('Usuário não autorizado');
      if (requiredCredential === '') return next();
      
      try {
        const decryptedToken = Jwt.decryptToken(authorization);
        if (decryptedToken.credential === 'Administrador'
         || decryptedToken.credential === requiredCredential) {
          next();
        } else {
          throw new CustomError(
            `Apenas ${requiredCredential || 'Administradores'} podem acessar`,
            '401',
          );
        }
      } catch (error) {
        next(error);
      }
    };
}

export default TokenValidation;