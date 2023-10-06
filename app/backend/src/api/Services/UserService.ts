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
    const newUserZod = new ZodValidation(userSchema);
    newUserZod.validateData(user);

    const zodValidated = user as IUser;

    if (zodValidated.credential === 'Estoquista' && zodValidated.stores) {
      throw new CustomError('Estoquista não pode fazer parte de lojas', '400');
    }

    // Valida se nome de usuário já existe e se as lojas no campo "stores" realmente existem.
    await ConsistencyChecker.checkUserConsistency(zodValidated);

    const newUser = await this.odm.createUser(zodValidated);
    
    const domain = DomainFactory.createDomain('user', newUser);
    return domain as User;
  }

  async checkLogin(credentials: unknown): Promise<ILoginResponse> {
    const loginZod = new ZodValidation(loginSchema);
    loginZod.validateData(credentials);
    const validatedCredentials = credentials as { userName: string, password: string };
    const { token, credential, expiresIn, id } = await 
    this.odm.checkLogin(validatedCredentials.userName, validatedCredentials.password);
    return { id, token, credential, expiresIn };
  }
}

export default UserService;