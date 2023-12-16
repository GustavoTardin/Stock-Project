// import User from '../../../Domains/User';
// import AbstractService from '../../../Services/AbstractService';
// import ILoginResponse from './ILoginResponse';
// import IUser from './IUser';
// import IUserODM from './IUserODM';

import { ICredential, IDbUser, ILoginResponse, IToken } from '../users'
import { User } from '../../../Domains'
import IService from './IService'

interface IUserService extends IService<User, IDbUser> {
  getByNickName(nickName: unknown, query: unknown): Promise<User>
  getCredentials(): Promise<ICredential[]>
  login(user: unknown): Promise<ILoginResponse & IToken>
  updatePassword(data: unknown): Promise<string>
  updateUserCredential(data: unknown): Promise<User>
  updateStatusById(data: unknown): Promise<string>
  selfUpdateById(id: number, data: unknown): Promise<User>
}

// interface IUserService extends AbstractService<IUser, IUserODM> {
//   createUser(user: unknown): Promise<User | Error>;
//   checkLogin(credentials: unknown): Promise<ILoginResponse>;
//   getUserNames(): Promise<string[]>
// }

export default IUserService
