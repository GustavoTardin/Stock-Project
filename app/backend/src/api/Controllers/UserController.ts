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

  getByNickName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickName } = req.params
      const user = await this._service.getByNickName(nickName)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this._service.createUser(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await this._service.login(req.body)
      res.status(200).json(userInfo)
    } catch (error) {
      next(error)
    }
  }

  deleteByNickName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { nickName } = req.params
      const deletedMessage = await this._service.deleteByNickName(nickName)
      res.status(200).json({ message: deletedMessage })
    } catch (error) {
      next(error)
    }
  }

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nickName } = req.params
      const { password } = req.body
      const updatedMessage = await this._service.updatePassword(
        nickName,
        password,
      )
      res.status(200).json({ message: updatedMessage })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
