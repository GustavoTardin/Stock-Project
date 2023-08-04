import { Router } from 'express';
import Validation from '../MIdllewares/Validation';
import UserODM from '../Models/UserODM';
import UserService from '../Services/UserService';
import UserController from '../Controllers/UserController';

const userRouter = Router();

const { usernameRequired, userPasswordRequired } = Validation;
const userODM = new UserODM();
const userService = new UserService(userODM);
const userController = new UserController(userService);

userRouter.post('/login', usernameRequired, userPasswordRequired, userController.checkLogin);

export default userRouter;