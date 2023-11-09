import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'

class UserValidation {
  static nickNameRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { nickName } = req.body
    console.log('oi nick')
    if (nickName) {
      next()
    } else {
      next(new CustomError('Nome de usuário é obrigatório', '400'))
    }
  }

  static firstNameRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { firstName } = req.body
    if (firstName) {
      next()
    } else {
      next(new CustomError('O nome de usuário é obrigatório!', '400'))
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
      next(new CustomError('O campo senha é obrigatório', '400'))
    }
  }

  static credentialRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { credentialId } = req.body
    if (credentialId) {
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
}

export default UserValidation
