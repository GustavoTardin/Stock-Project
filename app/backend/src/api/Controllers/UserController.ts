import { NextFunction, Request, Response } from 'express'
import { IDbUser, IUserService } from '../Contracts/interfaces/users'
import StatusCode from 'status-code-enum'
import AbstractController from './AbstractController'
import { User } from '../Domains'
import PrismaErrorHandler from '../Errors/PrismaErrorsHandler'
import isPrismaError from '../Utils/isPrismaError'

class UserController extends AbstractController<User, IDbUser, IUserService> {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await this.service.login(req.body)

      res.status(StatusCode.SuccessOK).json(userInfo)
    } catch (error) {
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
    }
  }

  getCredentials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = await this.service.getCredentials()
      res.status(StatusCode.SuccessOK).json(credentials)
    } catch (error) {
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
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
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
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
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
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
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
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
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
    }
  }

  getUserNamesById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const names = await this.service.getUserNamesById(Number(id))
      res.status(StatusCode.SuccessOK).json(names)
    } catch (error) {
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
    }
  }
}

export default UserController
