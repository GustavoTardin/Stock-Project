import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../Contracts/interfaces/users'
import { NotFoundError } from '@prisma/client/runtime/library'

class UserController {
  private _service: IUserService

  constructor(service: IUserService) {
    this._service = service
  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._service.getAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  getByNickName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickName } = req.params
      const user = await this._service.getByNickName(nickName)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
