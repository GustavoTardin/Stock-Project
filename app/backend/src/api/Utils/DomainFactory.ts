import { StoreSeller, User } from '../Domains'
import CustomError from '../Errors/CustomError'
import { IDbUser } from '../Contracts/interfaces/users'
import DomainTypes from './DomainTypes'
import StatusCode from 'status-code-enum'
import IStoreSeller from '../Contracts/interfaces/storeSellers/IDbStoreSeller'

class DomainFactory {
  public static createDomain<T>(type: string, obj: unknown): T {
    if (type === DomainTypes.USER) {
      return new User(obj as IDbUser) as T
    }
    if (type === DomainTypes.StoreSellers) {
      return new StoreSeller(obj as IStoreSeller) as T
    }
    throw new CustomError(
      'Tipo de domínio inválido',
      StatusCode.ServerErrorInternal,
    )
  }
}

export default DomainFactory
