import { ICredential, IDbUser, ICompleteUser, IChangePassword } from '..'
import ITransaction from '../../prisma/ITransaction'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(
    credential: string,
    showPassword?: boolean,
  ): Promise<IDbUser | null>
  getById(id: number, showPassword?: boolean): Promise<IDbUser | null>
  createUser(user: ICompleteUser, tx: ITransaction): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
  deleteById(id: number, transaction: ITransaction): Promise<void>
  updatePassword({ id, password }: IChangePassword): Promise<void>
}

export default IUserModel
