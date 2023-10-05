import ZodValidation from '../Contracts/zod/ZodValidation';
import User from '../Domains/User';
import { userSchema, loginSchema } from '../Contracts/zod/schemas';
import { ILoginResponse, IUser, IUserODM, IUserService } from '../Contracts/interfaces/users';
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
    const newUserJoi = new ZodValidation(userSchema);
    newUserJoi.validateData(user);

    const joiValidated = user as IUser;

    if (joiValidated.credential === 'Estoquista' && joiValidated.stores) {
      throw new CustomError('Estoquista não pode fazer parte de lojas', '400');
    }

    // Valida se nome de usuário já existe e se as lojas no campo "stores" realmente existem.
    await ConsistencyChecker.checkUserConsistency(joiValidated);

    const newUser = await this.odm.createUser(joiValidated);
    
    const domain = DomainFactory.createDomain('user', newUser);
    return domain as User;
  }

  async checkLogin(credentials: unknown): Promise<ILoginResponse> {
    const loginJoi = new ZodValidation(loginSchema);
    loginJoi.validateData(credentials);
    const validatedCredentials = credentials as { userName: string, password: string };
    const { token, credential, expiresIn, id } = await 
    this.odm.checkLogin(validatedCredentials.userName, validatedCredentials.password);
    return { id, token, credential, expiresIn };
  }
}

export default UserService;