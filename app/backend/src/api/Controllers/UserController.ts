import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../Contracts/interfaces/users'
import StatusCode from 'status-code-enum'

class UserController {
  private _service: IUserService

  constructor(service: IUserService) {
    this._service = service
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await this._service.login(req.body)
      res.status(StatusCode.SuccessOK).json(userInfo)
    } catch (error) {
      next(error)
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { includeInactive } = req.query
      const users = await this._service.getAll(includeInactive)
      res.status(StatusCode.SuccessOK).json(users)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { includeInactive } = req.query
      const { id } = req.params
      const user = await this._service.getById(Number(id), includeInactive)
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

  updateUserCredential = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const { credentialId } = req.body
      const updatedUser = await this._service.updateUserCredential({
        id: Number(id),
        credentialId,
      })
      res.status(StatusCode.SuccessOK).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  updateUserStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const { active } = req.body
      const updatedMessage = await this._service.updateStatusById({
        id: Number(id),
        active,
      })
      res.status(StatusCode.SuccessOK).json({ message: updatedMessage })
    } catch (error) {
      next(error)
    }
  }

  selfUpdateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const updatedUser = await this._service.selfUpdateById(
        Number(id),
        req.body,
      )
      res.status(StatusCode.SuccessOK).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
