import { Product, User } from '../Domains';
import CustomError from '../Errors/CustomError';
import IProduct from '../interfaces/products/IProduct';
import { IUser } from '../interfaces/users';
import DomainTypes from './DomainTypes';

class DomainFactory {
  public static createDomain(type: string, obj: unknown): User | Product | Error {
    if (type === DomainTypes.USER) {
      return new User(obj as IUser);
    }
    if (type === DomainTypes.PRODUCT) {
      return new Product(obj as IProduct);
    }
    throw new CustomError('Tipo de domínio inválido', '500');
  }
}

export default DomainFactory;