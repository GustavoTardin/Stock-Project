import { Router } from 'express'
import { TokenValidation, UserValidation } from '../Midllewares'
import credentialGuard from '../Utils/credentialGuard'
import UserModel from '../Models/UserModel'
import UserService from '../Services/UserService'
import prisma from '../database/prisma'
import UserController from '../Controllers/UserController'

const userRouter = Router()

const userModel = new UserModel(prisma)
const userService = new UserService(userModel)
const userController = new UserController(userService)
// const {
//   usernameRequired,
//   passwordRequired,
//   credentialRequired,
//   ifSellerStoreRequired,
// } = UserValidation
// const { tokenRequired } = TokenValidation

userRouter.get('/', userController.getAll)
userRouter.get('/:nickName', userController.getByNickName)
// userRouter.get('/names', tokenRequired(), userController.getUserNames)
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
