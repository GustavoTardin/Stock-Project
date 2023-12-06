import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../Contracts/interfaces/users'
import StatusCode from 'status-code-enum'

class UserController {
  private _service: IUserService

  constructor(service: IUserService) {
    this._service = service
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this._service.createUser(req.body)
      res.status(StatusCode.SuccessCreated).json(newUser)
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await this._service.login(req.body)
      res.status(StatusCode.SuccessOK).json(userInfo)
    } catch (error) {
      next(error)
    }
  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._service.getAll()
      res.status(StatusCode.SuccessOK).json(users)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this._service.getById(Number(id))
      res.status(StatusCode.SuccessOK).json(user)
    } catch (error) {
      next(error)
    }
  }

  getCredentials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = await this._service.getCredentials()
      res.status(StatusCode.SuccessOK).json(credentials)
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deletedMessage = await this._service.deleteById(Number(id))
      res.status(StatusCode.SuccessOK).json({ message: deletedMessage })
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
      res.status(StatusCode.SuccessOK).json({ message: updatedMessage })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
