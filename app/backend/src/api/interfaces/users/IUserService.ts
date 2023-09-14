import User from '../../Domains/User';
import AbstractService from '../../Services/AbstractService';
import ILoginResponse from './ILoginResponse';
import IUser from './IUser';
import IUserODM from './IUserODM';

interface IUserService extends AbstractService<IUser, IUserODM> {
  createUser(user: unknown): Promise<User | Error>;
  checkLogin(credentials: unknown): Promise<ILoginResponse>;
  getUserNames(): Promise<string[]>
}

export default IUserService;