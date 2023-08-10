/* eslint-disable no-param-reassign */
import * as bcrypt from 'bcrypt';
import CustomError from '../Errors/CustomError';
import IUser from '../interfaces/users/IUser';
import AbstractODM from './AbstractODM';
import userSchema from './Schemas/userSchema';
import Jwt from '../Auth/Jwt';
import StoreODM from './StoreODM';

class UserODM extends AbstractODM<IUser> {
  protected storeModel: StoreODM;
  constructor() {
    super(userSchema, 'User');
    this.storeModel = new StoreODM();
  }

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

  validateStoreField = async (user: IUser) => {
    const stores = await this.storeModel.getAll();
    const storeNames = stores.map((e) => e.name);
    if (!(user.store.every((e) => storeNames.includes(e)))) {
      throw new CustomError('Esta loja não existe no banco de dados!', '400');
    }
    if (user.credential === 'Adminstrador' && user.store.length !== storeNames.length) {
      user.store = storeNames;
    }
    return user;
  };

  checkLogin = async (userName: string, password: string): Promise<string | Error> => {
    const user = await this.model.findOne({ userName });
    if (!user) throw new CustomError('Invalid username or password', '404');
    if (!bcrypt.compareSync(password, user.password)) {
      throw new CustomError('Invalid username or password', '404');
    } else {
      const token = this.generateUserAuthToken(user);
      return token;
    }
  };

  createUser = async (user: IUser): Promise<IUser> => {
    const duplicateUsername = await this.model.findOne({ userName: user.userName });
    if (duplicateUsername) throw new CustomError('Username already in use', '409');
    user = await this.validateStoreField(user);
    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = await this.model.create({ ...user });
    return newUser;
  };
}

export default UserODM;