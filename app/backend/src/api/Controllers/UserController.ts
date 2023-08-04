/*
import { Request, Response } from 'express';
import IUserController from '../interfaces/users/IUserController';
import IService from '../interfaces/IService';
import IUser from '../interfaces/users/IUser';

class UserController implements IUserController {
  private _service: IService<IUser>;
  constructor(service:IService<IUser>) {
    this._service = service;
  }

  checkLogin = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await this._service.getAll();
    res.status(200).json(users);
  };
  getUserById(_req: Request, _res: Response): void {
    throw new Error('Method not implemented.');
  }
  createUser(_req: Request, _res: Response): void {
    throw new Error('Method not implemented.');
  }
  updateUser(_req: Request, _res: Response): void {
    throw new Error('Method not implemented.');
  }
  deleteUser(_req: Request, _res: Response): void {
    throw new Error('Method not implemented.');
  }
}

export default UserController;
*/