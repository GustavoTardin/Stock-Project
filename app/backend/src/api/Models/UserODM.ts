/* eslint-disable no-param-reassign */
import * as bcrypt from 'bcrypt';
import CustomError from '../Errors/CustomError';
import { ILoginResponse, IToken, IUser, IUserODM } from '../interfaces/users';
import userSchema from './Schemas/user/userSchema';
import Jwt from '../Auth/Jwt';
import AbstractODM from './AbstractODM';

class UserODM extends AbstractODM<IUser> implements IUserODM {
  constructor() {
    super(userSchema, 'User');
  }

  getUserNames = async (): Promise<string[]> => {
    const userNames = await this.model.find(
      { credential: { $ne: 'Estoquista' } },
      'userName',
    ).exec();
    return userNames.map((user) => user.userName);
  };

  generateUserAuthToken = (user: (IUser & { _id: string; })) => {
    const payload: IToken = {
      id: user._id,
      userName: user.userName,
      credential: user.credential,
    };
    if (user.stores) {
      payload.stores = user.stores;
    }
    const token = Jwt.generateToken(payload);
    return token;
  };
  
  createUser = async (user: IUser): Promise<IUser> => {
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = await this.model.create({ ...user });
    return newUser;
  };
  
  checkLogin = async (userName: string, password: string): Promise<ILoginResponse> => {
    const user = await this.model.findOne({ userName });
    if (!user) throw new CustomError('Nome de usuário ou senha inválidos', '404');
    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError('Nome de usuário ou senha inválidos', '404');
    } else {
      const token = this.generateUserAuthToken(user);
      return { token, credential: user.credential };
    }
  };
}

export default UserODM;