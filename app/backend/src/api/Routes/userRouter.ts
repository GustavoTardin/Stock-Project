import { Router } from 'express'
import { TokenValidation, UserValidation } from '../Midllewares'
import credentialGuard from '../Utils/credentialGuard'
import UserService from '../Services/UserService'
import prisma from '../database/prisma'
import UserController from '../Controllers/UserController'
import { StoreModel, UserModel } from '../Models'
import StoreSellerModel from '../Models/StoreSellerModel'

const userRouter = Router()
const userModel = new UserModel(prisma)
const storeModel = new StoreModel(prisma)
const storeSellerModel = new StoreSellerModel(prisma)
const userService = new UserService(userModel, storeModel, storeSellerModel)
const userController = new UserController(userService)
const {
  nickNameRequired,
  passwordRequired,
  newPasswordRequired,
  credentialRequired,
  firstNameRequired,
  paramsIdRequired,
  activeRequired,
} = UserValidation
const { tokenRequired, verifyUserOwnership } = TokenValidation

userRouter.get(
  '/',
  tokenRequired(credentialGuard.highLevelAccess),
  userController.getAll,
)

userRouter.get('/credentials', tokenRequired(credentialGuard.highLevelAccess))
userRouter.get(
  '/:id',
  tokenRequired(credentialGuard.freeAccess),
  paramsIdRequired,
  userController.getById,
)
userRouter.post(
  '/create',
  tokenRequired(credentialGuard.highLevelAccess),
  nickNameRequired,
  firstNameRequired,
  passwordRequired,
  credentialRequired,
  userController.createUser,
)
userRouter.post(
  '/login',
  nickNameRequired,
  passwordRequired,
  userController.login,
)

userRouter.patch(
  '/:id/update-password',
  paramsIdRequired,
  tokenRequired(credentialGuard.freeAccess),
  verifyUserOwnership,
  passwordRequired,
  newPasswordRequired,
  userController.updatePassword,
)

userRouter.patch(
  '/:id/update-credential',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  credentialRequired,
  userController.updateUserCredential,
)

userRouter.patch(
  '/:id/update-status',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  activeRequired,
  userController.updateUserStatus,
)

userRouter.patch(
  '/:id/self-update',
  tokenRequired(credentialGuard.freeAccess),
  paramsIdRequired,
  verifyUserOwnership,
  userController.selfUpdateById,
)

export default userRouter
