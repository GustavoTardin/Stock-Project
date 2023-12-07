import {
  ICredential,
  IDbUser,
  ICompleteUser,
  IChangePassword,
  IChangeUserCredential,
} from '..'
import ITransaction from '../../prisma/ITransaction'

interface IUserModel {
  getAll(includeInactive: boolean): Promise<IDbUser[]>
  getByNickName(
    nickName: string,
    showPassword?: boolean,
  ): Promise<IDbUser | null>
  getById(id: number, showPassword?: boolean): Promise<IDbUser | null>
  getCredentials(): Promise<ICredential[]>
  getCredentialById(id: number): Promise<ICredential | null>
  createUser(user: ICompleteUser, tx: ITransaction): Promise<IDbUser>
  deleteById(id: number, transaction: ITransaction): Promise<void>
  updatePassword({ id, password }: IChangePassword): Promise<void>
  updateUserCredential({
    id,
    credentialId,
  }: IChangeUserCredential): Promise<IDbUser>
}

export default IUserModel
