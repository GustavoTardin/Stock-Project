import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/UserService';
import AbstractController from './AbstractController';
import { IUser, IUserODM } from '../interfaces/users';

class UserController extends AbstractController<IUser, IUserODM, UserService> {
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
      const token = await this.service.checkLogin(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;