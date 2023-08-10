import AbstractODM from '../../Models/AbstractODM';
import IUser from './IUser';

interface IUserODM extends AbstractODM<IUser> {
  generateUserAuthToken(user: IUser & { _id: string }): string;
  validateStoreField(user: IUser): Promise<IUser>;
  checkLogin(userName: string, password: string): Promise<string | Error>;
  createUser(user: IUser): Promise<IUser>;
}

export default IUserODM;