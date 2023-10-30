import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'

class UserValidation {
  static usernameRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { userName } = req.body
    if (userName) {
      next()
    } else {
      next(new CustomError('Nome do novo colaborador é obrigatório', '400'))
    }
  }

  static passwordRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { password } = req.body
    if (password) {
      next()
    } else {
      next(
        new CustomError(
          'Você deve fornecer uma senha para o novo colaborador',
          '400',
        ),
      )
    }
  }

  static credentialRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { credential } = req.body
    if (credential) {
      next()
    } else {
      next(
        new CustomError(
          'Você deve fornecer a função do novo colaborador',
          '400',
        ),
      )
    }
  }

  static ifSellerStoreRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { credential, stores } = req.body
    if (credential === 'Lojista' && !stores) {
      throw new CustomError(
        'Lojista deve ter o campo Vendedores preenchido',
        '400',
      )
    }
    if (credential !== 'Lojista') delete req.body.stores
    next()
  }
}

export default UserValidation
