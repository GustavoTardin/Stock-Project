// /* eslint-disable no-param-reassign */
// import * as bcrypt from 'bcrypt';
// import CustomError from '../Errors/CustomError';
// import { ILoginResponse, IToken, IUser, IUserODM } from '../Contracts/interfaces/users';
// import userSchema from '../Contracts/mongoSchemas/user/userSchema';
// import Jwt from '../Auth/Jwt';
// import AbstractODM from './AbstractODM';
// import { IStoreODM } from '../interfaces/stores';

// class UserODM extends AbstractODM<IUser> implements IUserODM {
//   protected storeODM: IStoreODM;
//   constructor(store: IStoreODM) {
//     super(userSchema, 'User');
//     this.storeODM = store;
//   }

//   getUserNames = async (userName = ''): Promise<string[]> => {
//     const userNames = await this.model.find(
//       userName ? { userName } : {},
//       'userName',
//     ).exec();
//     return userNames.map((user) => user.userName);
//   };

//   generateUserAuthToken = (user: (IUser & { _id: string; })) => {
//     const payload: IToken = {
//       id: user._id,
//       userName: user.userName,
//       credential: user.credential,
//     };
//     if (user.stores) {
//       payload.stores = user.stores;
//     }
//     const auth = Jwt.generateToken(payload);
//     return auth;
//   };

//   createUser = async (user: IUser): Promise<IUser> => {
//     const duplicatedUsername = await this.getUserNames(user.userName);
//     if (duplicatedUsername) throw new CustomError('Nome de usuário já em uso!', '409');
//     if (user.stores && user.stores.length > 0) {
//       const storeNames = await this.storeODM.getStoreNames();
//       if (!(user.stores.every((e) => storeNames.includes(e)))) {
//         throw new CustomError('Esta loja não existe no banco de dados!', '400');
//       }
//     }
//     user.password = bcrypt.hashSync(user.password, 10);
//     const newUser = await this.model.create({ ...user });
//     return newUser;
//   };

//   checkLogin = async (userName: string, password: string): Promise<ILoginResponse> => {
//     const user = await this.model.findOne({ userName });
//     if (!user) throw new CustomError('Nome de usuário ou senha inválidos', '404');
//     if (!bcrypt.compareSync(password, user.password)) {
//       throw new CustomError('Nome de usuário ou senha inválidos', '404');
//     } else {
//       const { token, expiresIn } = this.generateUserAuthToken(user);
//       return { id: user.id as string, token, credential: user.credential, expiresIn };
//     }
//   };
// }

// export default UserODM;
