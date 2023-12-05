import { NextFunction, Request, Response } from 'express'
import StatusCode from 'status-code-enum'
import CustomError from '../Errors/CustomError'

class UserValidation {
  static nickNameRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { nickName } = req.body
    if (nickName) {
      next()
    } else {
      const error = new CustomError(
        'Nome de usuário é obrigatório',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
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
      const error = new CustomError(
        'O nome do colaborador é obrigatório!',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
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
      const error = new CustomError(
        'O campo senha é obrigatório',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
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
      const error = new CustomError(
        'Você deve fornecer a função do novo colaborador',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
    }
  }

  static paramsIdRequired = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params
    // Verifica se o id está presente e se é um número válido
    if (!id || isNaN(Number(id))) {
      const error = new CustomError(
        'O id é obrigatório e deve ser um número!',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
    } else {
      next()
    }
  }

  static newPasswordRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { newPassword } = req.body
    if (newPassword) {
      next()
    } else {
      const error = new CustomError(
        'A nova senha é obrigatório',
        StatusCode.ClientErrorBadRequest.toString(),
      )
      next(error)
    }
  }
}

export default UserValidation
