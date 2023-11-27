import { ICredential, IDbUser, ICompleteUser, ILoginUser } from '.'
import ITransaction from '../prisma/ITransaction'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string, login?: boolean): Promise<IDbUser | null>
  createUser(user: ICompleteUser, tx: ITransaction): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
  deleteByNickName(nickName: string): Promise<void>
  updatePassword({ nickName, password }: ILoginUser): Promise<void>
}

export default IUserModel
