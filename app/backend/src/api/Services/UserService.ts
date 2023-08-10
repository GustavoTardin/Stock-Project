import UserODM from '../Models/UserODM';
import JoiValidation from '../Utils/JoiValidation';
import loginSchema from '../Utils/JoiSchemas/loginSchema';
import User from '../Domains/User';
import userSchema from '../Utils/JoiSchemas/userSchema';
import IUser from '../interfaces/users/IUser';
import CustomError from '../Errors/CustomError';

class UserService {
  protected model: UserODM;

  constructor(ODM: UserODM) {
    this.model = ODM;
  }

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
    const newUser = await this.model.createUser(validatedUser);
    const domain = new User(newUser);
    return domain;
  }

  async checkLogin(credentials: unknown): Promise<string | Error> {
    const loginJoi = new JoiValidation(loginSchema);
    loginJoi.validateData(credentials);
    const validatedCredentials = credentials as { userName: string, password: string };
    const token = await 
    this.model.checkLogin(validatedCredentials.userName, validatedCredentials.password);
    return token;
  }
}

export default UserService;