import {
  IUserService,
  IUserModel,
  // ICompleteUser,
  ILoginResponse,
  IToken,
  ILoginUser,
  ICompleteUser,
} from '../Contracts/interfaces/users'
import ZodValidation from '../Contracts/zod/ZodValidation'
import { completeUserSchema, loginSchema } from '../Contracts/zod/schemas/users'
import { User } from '../Domains'
import CustomError from '../Errors/CustomError'
import generateAccessInfo from '../Utils/generateAccessInfo'
import { CompareHash } from '../Utils/hashPassword'
import validateField from '../Utils/serviceValidation'

class UserService implements IUserService {
  private _model: IUserModel

  constructor(model: IUserModel) {
    this._model = model
  }

  async getAll(): Promise<User[]> {
    const users = await this._model.getAll()
    const domains = users.map((user) => new User(user))
    return domains
  }

  async getByNickName(nickName: string): Promise<User> {
    const user = await this._model.getByNickName(nickName)
    if (!user) throw new CustomError('Usuário não encontrado', '404')
    const domain = new User(user)
    return domain
  }

  async createUser(user: unknown): Promise<User> {
    // validação
    const validatedUser = validateField<ICompleteUser>(completeUserSchema, user)

    // Verifica se nickname já está em uso
    const duplicatedUser = await this._model.getByNickName(
      validatedUser.nickName,
    )
    if (duplicatedUser)
      throw new CustomError('Nome de usuário já existe!!', '409')

    // Cria o usuário
    const newUser = await this._model.createUser(validatedUser)
    if (validatedUser.stores) {
    }
    const domain = new User(newUser)
    return domain
  }

  async login(loginUser: unknown): Promise<ILoginResponse & IToken> {
    // validação
    const validatedLogin = validateField<ILoginUser>(loginSchema, loginUser)

    // verifica se nickname existe
    const userFound = await this._model.getByNickName(
      validatedLogin.nickName,
      true,
    )
    if (!userFound)
      throw new CustomError('Nome de usuário ou senha incorretos', '401')

    // verifica se a senha coincide
    const rightPassword = await CompareHash(
      validatedLogin.password,
      userFound.password,
    )
    if (rightPassword) {
      return generateAccessInfo(userFound)
    } else {
      throw new CustomError('Nome de usuário ou senha incorretos', '401')
    }
  }
}

export default UserService

// import ZodValidation from '../Contracts/zod/ZodValidation';
// import User from '../Domains/User';
// import { userSchema, loginSchema } from '../Contracts/zod/schemas';
// import { ILoginResponse, IUser, IUserODM, IUserService } from '../Contracts/interfaces/users';
// import CustomError from '../Errors/CustomError';
// import AbstractService from './AbstractService';
// import DomainFactory from '../Utils/DomainFactory';

// class UserService extends AbstractService<IUser, IUserODM> implements IUserService {
//   async getUserNames(): Promise<string[]> {
//     const userNames = await this.odm.getUserNames();
//     return userNames;
//   }

//   async createUser(user: unknown): Promise<User | Error> {
//     const newUserZod = new ZodValidation(userSchema);
//     newUserZod.validateData(user);

//     const zodValidated = user as IUser;

//     if (zodValidated.credential === 'Estoquista' && zodValidated.stores) {
//       throw new CustomError('Estoquista não pode fazer parte de lojas', '400');
//     }

//     // Valida se nome de usuário já existe e se as lojas no campo "stores" realmente existem.
//     await ConsistencyChecker.checkUserConsistency(zodValidated);

//     const newUser = await this.odm.createUser(zodValidated);

//     const domain = DomainFactory.createDomain('user', newUser);
//     return domain as User;
//   }

//   async checkLogin(credentials: unknown): Promise<ILoginResponse> {
//     const loginZod = new ZodValidation(loginSchema);
//     loginZod.validateData(credentials);
//     const validatedCredentials = credentials as { userName: string, password: string };
//     const { token, credential, expiresIn, id } = await
//     this.odm.checkLogin(validatedCredentials.userName, validatedCredentials.password);
//     return { id, token, credential, expiresIn };
//   }
// }

// export default UserService;
