import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../Contracts/interfaces/users'

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
}

export default UserController
