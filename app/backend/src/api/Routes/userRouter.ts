import { Router } from 'express';
import { UserValidation } from '../Midllewares';
import UserODM from '../Models/UserODM';
import UserService from '../Services/UserService';
import UserController from '../Controllers/UserController';

const userRouter = Router();

const userODM = new UserODM();
const userService = new UserService(userODM);
const userController = new UserController(userService);
const { usernameRequired, passwordRequired, credentialRequired, storeRequired } = UserValidation;

userRouter.get('/', userController.getAll);
userRouter.get('/names', userController.getUserNames);
userRouter.post('/login', usernameRequired, passwordRequired, userController.checkLogin);
userRouter.post(
  '/create', 
  usernameRequired,
  passwordRequired, 
  credentialRequired, 
  storeRequired, 
  userController.createUser,
);
export default userRouter;