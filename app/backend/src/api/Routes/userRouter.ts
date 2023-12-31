import { Router } from 'express'
import { TokenValidation, UserValidation } from '../Middlewares'
import credentialGuard from '../Utils/credentialGuard'
import UserService from '../Services/UserService'
import UserController from '../Controllers/UserController'
import { storeModel, userModel, storeSellerModel } from '../Models'

const userRouter = Router()
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
  currentPasswordRequired,
} = UserValidation
const { tokenRequired, verifyUserOwnership } = TokenValidation

userRouter.get(
  '/',
  tokenRequired(credentialGuard.highLevelAccess),
  userController.getAll,
)

userRouter.get(
  '/credentials',
  tokenRequired(credentialGuard.freeAccess),
  userController.getCredentials,
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
  userController.create,
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
  currentPasswordRequired,
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
  userController.updateStatusById,
)

userRouter.patch(
  '/:id/self-update',
  tokenRequired(credentialGuard.freeAccess),
  paramsIdRequired,
  verifyUserOwnership,
  userController.selfUpdateById,
)

userRouter.get(
  '/:id/names',
  tokenRequired(credentialGuard.freeAccess),
  paramsIdRequired,
  verifyUserOwnership,
  userController.getUserNamesById,
)

export default userRouter
