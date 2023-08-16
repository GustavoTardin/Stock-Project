import JoiValidation from '../Utils/JoiValidation';
import User from '../Domains/User';
import { userSchema, loginSchema } from '../Utils/JoiSchemas';
import { ILoginResponse, IUser, IUserODM, IUserService } from '../interfaces/users';
import CustomError from '../Errors/CustomError';
import AbstractService from './AbstractService';
import DomainFactory from '../Utils/DomainFactory';

class UserService extends AbstractService<IUser, IUserODM> implements IUserService {
  async createUser(user: unknown): Promise<User | Error> {
    const newUserJoi = new JoiValidation(userSchema);
    newUserJoi.validateData(user);

    const validatedUser = user as IUser;

    if (validatedUser.credential === 'Lojista' && validatedUser.store.length < 1) {
      throw new CustomError('Lojista deve fazer parte de pelo menos 1 loja', '400');
    }

    if (validatedUser.credential === 'Estoquista' && validatedUser.store.length > 0) {
      throw new CustomError('Estoquista não pode fazer parte de lojas', '400');
    }
    const newUser = await this.odm.createUser(validatedUser);
    const domain = DomainFactory.createDomain('user', newUser);
    return domain as User;
  }

  async checkLogin(credentials: unknown): Promise<ILoginResponse> {
    const loginJoi = new JoiValidation(loginSchema);
    loginJoi.validateData(credentials);
    const validatedCredentials = credentials as { userName: string, password: string };
    const { token, credential } = await 
    this.odm.checkLogin(validatedCredentials.userName, validatedCredentials.password);
    return { token, credential };
  }
}

export default UserService;