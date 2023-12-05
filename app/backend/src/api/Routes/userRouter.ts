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
} = UserValidation
const { tokenRequired, verifyUserOwnership } = TokenValidation

userRouter.get(
  '/',
  tokenRequired(credentialGuard.highLevelAccess),
  userController.getAll,
)
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

userRouter.delete(
  '/delete/:id',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  userController.deleteById,
)

userRouter.patch(
  '/update-password/:id',
  paramsIdRequired,
  tokenRequired(credentialGuard.freeAccess),
  verifyUserOwnership,
  passwordRequired,
  newPasswordRequired,
  userController.updatePassword,
)
// userRouter.get('/names', tokenRequired, userController.getUserNames)
// userRouter.post(
//   '/login',
//   usernameRequired,
//   passwordRequired,
//   userController.checkLogin,
// )
// userRouter.post(
//   '/create',
//   usernameRequired,
//   passwordRequired,
//   credentialRequired,
//   ifSellerStoreRequired,
//   userController.createUser,
// )

// userRouter.delete(
//   '/:id',
//   tokenRequired(credentialGuard.admin),
//   userController.deleteById,
// )

export default userRouter
