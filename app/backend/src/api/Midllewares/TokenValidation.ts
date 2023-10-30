import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'
import Jwt from '../Auth/Jwt'

class TokenValidation {
  static tokenRequired =
    (requiredCredential: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const unauthorizedMessage = 'Usuário não autorizado'
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(401).json({ message: unauthorizedMessage })
      }
      try {
        const decryptedToken = Jwt.decryptToken(authorization)
        const userCredential = decryptedToken.credential
        if (requiredCredential.some((e) => e === userCredential)) {
          next()
        } else {
          throw new CustomError(unauthorizedMessage, '401')
        }
      } catch {
        const error = new CustomError(unauthorizedMessage, '401')
        next(error)
      }
    }
}

export default TokenValidation
