import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../Contracts/interfaces/users'

class UserController {
  private _service: IUserService

  constructor(service: IUserService) {
    this._service = service
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

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._service.getAll()
      res.status(200).json(users)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this._service.getById(Number(id))
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedMessage = await this._service.deleteById(Number(id))
      res.status(200).json({ message: deletedMessage })
    } catch (error) {
      next(error)
    }
  }

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { password, newPassword } = req.body
      const updatedMessage = await this._service.updatePassword({
        id: Number(id),
        password,
        newPassword,
      })
      res.status(200).json({ message: updatedMessage })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
