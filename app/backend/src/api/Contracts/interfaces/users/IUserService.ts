// import User from '../../../Domains/User';
// import AbstractService from '../../../Services/AbstractService';
// import ILoginResponse from './ILoginResponse';
// import IUser from './IUser';
// import IUserODM from './IUserODM';

import { ILoginResponse, IToken } from '.'
import { User } from '../../../Domains'

interface IUserService {
  getAll(): Promise<User[]>
  getByNickName(nickName: unknown): Promise<User>
  createUser(user: unknown): Promise<User>
  login(user: unknown): Promise<ILoginResponse & IToken>
  deleteByNickName(nickName: unknown): Promise<string>
  updatePassword(nickName: unknown, password: unknown): Promise<string>
}

// interface IUserService extends AbstractService<IUser, IUserODM> {
//   createUser(user: unknown): Promise<User | Error>;
//   checkLogin(credentials: unknown): Promise<ILoginResponse>;
//   getUserNames(): Promise<string[]>
// }

export default IUserService
