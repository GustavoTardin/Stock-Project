import AbstractODM from '../../../Models/AbstractODM';
import ILoginResponse from './ILoginResponse';
import IUser from './IUser';

interface IUserODM extends AbstractODM<IUser> {
  generateUserAuthToken(user: IUser & { _id: string }): { token: string, expiresIn: number };
  checkLogin(userName: string, password: string): Promise<ILoginResponse>;
  createUser(user: IUser): Promise<IUser>;
  getUserNames(): Promise<string[]>
}

export default IUserODM;