import { NextFunction, Request, Response } from 'express';
import AbstractController from './AbstractController';
import { IUser, IUserODM, IUserService } from '../interfaces/users';

class UserController extends AbstractController<IUser, IUserODM, IUserService> {
  constructor(service: IUserService) {
    super('user', service);
  }
  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newUser = await this.service.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  checkLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, credential } = await this.service.checkLogin(req.body);
      res.status(200).json({ token, credential });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;