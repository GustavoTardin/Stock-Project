import { NextFunction, Request, Response } from 'express'
import { IDbUser, IUserService } from '../Contracts/interfaces/users'
import StatusCode from 'status-code-enum'
import AbstractController from './AbstractController'
import { User } from '../Domains'

class UserController extends AbstractController<User, IDbUser, IUserService> {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await this.service.login(req.body)
      res.status(StatusCode.SuccessOK).json(userInfo)
    } catch (error) {
      next(error)
    }
  }

  getCredentials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = await this.service.getCredentials()
      res.status(StatusCode.SuccessOK).json(credentials)
    } catch (error) {
      next(error)
    }
  }

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { password, newPassword } = req.body
      const updatedMessage = await this.service.updatePassword({
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
      const updatedUser = await this.service.updateUserCredential({
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
      const updatedMessage = await this.service.updateStatusById({
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
      const updatedUser = await this.service.selfUpdateById(
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
