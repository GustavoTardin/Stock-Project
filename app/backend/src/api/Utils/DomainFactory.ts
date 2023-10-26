// import { Store, User } from '../Domains';
// import CustomError from '../Errors/CustomError';
// import IProduct from '../Contracts/interfaces/products/IProduct';
// import { IUser } from '../Contracts/interfaces/users';
// import DomainTypes from './DomainTypes';
// import { IStore } from '../Contracts/interfaces/stores';

// class DomainFactory {
//   public static createDomain(type: string, obj: unknown): User | Store {
//     if (type === DomainTypes.USER) {
//       return new User(obj as IUser);
//     }
//     /* if (type === DomainTypes.PRODUCT) {
//       return new Product(obj as IProduct);
//     }
//     */
//     if (type === DomainTypes.STORE) {
//       return new Store(obj as IStore);
//     }
//     throw new CustomError('Tipo de domínio inválido', '500');
//   }
// }

// export default DomainFactory;