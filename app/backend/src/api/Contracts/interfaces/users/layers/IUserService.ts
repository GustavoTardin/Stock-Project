// import User from '../../../Domains/User';
// import AbstractService from '../../../Services/AbstractService';
// import ILoginResponse from './ILoginResponse';
// import IUser from './IUser';
// import IUserODM from './IUserODM';

import { ICredential, ILoginResponse, IToken } from '..'
import { User } from '../../../../Domains'

interface IUserService {
  getAll(includeInactive: unknown): Promise<User[]>
  getCredentials(): Promise<ICredential[]>
  getByNickName(nickName: unknown): Promise<User>
  getById(id: number): Promise<User>
  createUser(user: unknown): Promise<User>
  login(user: unknown): Promise<ILoginResponse & IToken>
  deleteById(id: number): Promise<string>
  updatePassword(data: unknown): Promise<string>
}

// interface IUserService extends AbstractService<IUser, IUserODM> {
//   createUser(user: unknown): Promise<User | Error>;
//   checkLogin(credentials: unknown): Promise<ILoginResponse>;
//   getUserNames(): Promise<string[]>
// }

export default IUserService
