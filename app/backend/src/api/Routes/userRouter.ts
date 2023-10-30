import { Router } from 'express'
import { TokenValidation, UserValidation } from '../Midllewares'
import credentialGuard from '../Utils/credentialGuard'

const userRouter = Router()

const userODM = new UserODM()
const userService = new UserService(userODM)
const userController = new UserController(userService)
const {
  usernameRequired,
  passwordRequired,
  credentialRequired,
  ifSellerStoreRequired,
} = UserValidation
const { tokenRequired } = TokenValidation

// userRouter.get('/', tokenRequired(), userController.getAll)
// userRouter.get('/names', tokenRequired(), userController.getUserNames)
userRouter.post(
  '/login',
  usernameRequired,
  passwordRequired,
  userController.checkLogin,
)
userRouter.post(
  '/create',
  usernameRequired,
  passwordRequired,
  credentialRequired,
  ifSellerStoreRequired,
  userController.createUser,
)

userRouter.delete(
  '/:id',
  tokenRequired(credentialGuard.admin),
  userController.deleteById,
)

export default userRouter
