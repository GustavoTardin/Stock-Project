import { Router } from 'express'
import { UserValidation } from '../Midllewares'
// import credentialGuard from '../Utils/credentialGuard'
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
  credentialRequired,
  firstNameRequired,
} = UserValidation
// const { tokenRequired } = TokenValidation

userRouter.get('/', userController.getAll)
userRouter.get('/:nickName', userController.getByNickName)
userRouter.post(
  '/create',
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
