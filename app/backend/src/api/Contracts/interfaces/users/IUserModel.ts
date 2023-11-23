import { ICredential, IDbUser, ICompleteUser } from '.'
import ITransaction from '../prisma/ITransaction'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string, login?: boolean): Promise<IDbUser | null>
  createUser(user: ICompleteUser, tx: ITransaction): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
}

export default IUserModel
