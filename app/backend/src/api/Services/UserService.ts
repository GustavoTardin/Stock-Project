import JoiValidation from '../Utils/JoiValidation';
import User from '../Domains/User';
import { userSchema, loginSchema } from '../Utils/JoiSchemas';
import { ILoginResponse, IUser, IUserODM, IUserService } from '../interfaces/users';
import CustomError from '../Errors/CustomError';
import AbstractService from './AbstractService';
import DomainFactory from '../Utils/DomainFactory';
import ConsistencyChecker from '../Utils/ConsistencyChecker';

class UserService extends AbstractService<IUser, IUserODM> implements IUserService {
  async getUserNames(): Promise<string[]> {
    const userNames = await this.odm.getUserNames();
    return userNames;
  }

  async createUser(user: unknown): Promise<User | Error> {
    const newUserJoi = new JoiValidation(userSchema);
    newUserJoi.validateData(user);

    const joiValidated = user as IUser;

    if (joiValidated.credential === 'Estoquista' && joiValidated.store.length > 0) {
      throw new CustomError('Estoquista não pode fazer parte de lojas', '400');
    }

    const dbValidated = await ConsistencyChecker.checkUserConsistency(joiValidated);

    const newUser = await this.odm.createUser(dbValidated);
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