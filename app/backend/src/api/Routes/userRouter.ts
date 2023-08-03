import { Router } from 'express';
import Validation from '../MIdllewares/Validation';

const userRouter = Router();

const { usernameRequired, userPasswordRequired } = Validation;

userRouter.post('/login', usernameRequired, userPasswordRequired);

export default userRouter;