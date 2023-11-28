import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'
import Jwt from '../Auth/Jwt'

class TokenValidation {
  static unauthorizedMessage = 'Usuário não autorizado'
  static tokenRequired =
    (requiredCredential: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(401).json({ message: this.unauthorizedMessage })
      }
      try {
        const decryptedToken = Jwt.decryptToken(authorization)
        const userCredential = decryptedToken.credentialName
        if (requiredCredential.some((e) => e === userCredential) === false) {
          // Simplesmente joga pro bloco catch, que trata o erro de forma adequada
          throw new Error('Unauthorized')
        }
        next()
      } catch {
        const error = new CustomError(this.unauthorizedMessage, '401')
        next(error)
      }
    }

  static verifyUserOwnership = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { authorization } = req.headers
      const { id } = req.params
      // É passado como string pois este metódo será chamado após o tokenRequired, que já valida o req.headers.authorization
      const decryptedToken = Jwt.decryptToken(authorization as string)
      if (decryptedToken.id !== Number(id)) {
        // Simplesmente joga pro bloco catch, que trata o erro de forma adequada
        throw new Error('Unauthorized')
      }
      next()
    } catch {
      const error = new CustomError(this.unauthorizedMessage, '401')
      next(error)
    }
  }
}

export default TokenValidation
