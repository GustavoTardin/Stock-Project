/* eslint-disable no-param-reassign */
import * as bcrypt from 'bcrypt';
import CustomError from '../Errors/CustomError';
import { ILoginResponse, IUser, IUserODM } from '../interfaces/users';
import userSchema from './Schemas/user/userSchema';
import Jwt from '../Auth/Jwt';
import { AbstractODM } from '.';
import { IStoreODM } from '../interfaces/stores';
import ConsistencyChecker from '../Utils/ConsistencyChecker';

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
    const payload = {
      id: user._id,
      userName: user.userName,
      credential: user.credential,
      store: user.store,
    };
    const token = Jwt.generateToken(payload);
    return token;
  };
  
  createUser = async (user: IUser): Promise<IUser> => {
    const duplicateUsername = await this.model.findOne({ userName: user.userName });
    if (duplicateUsername) throw new CustomError('Nome de usuário já em uso!', '409');
    user = await ConsistencyChecker.checkStoreName(user);
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