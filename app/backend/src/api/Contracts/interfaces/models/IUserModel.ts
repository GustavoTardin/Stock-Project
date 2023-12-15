import {
  ICredential,
  IDbUser,
  ICompleteUser,
  IChangePassword,
  IChangeUserCredential,
} from '../users'
import IModel from './IModel'
import ITransaction from '../prisma/ITransaction'
import ISelfUpdate from '../users/updates/ISelfUpdate'

interface IUserModel extends IModel<IDbUser, ICompleteUser> {
  getByNickName(
    nickName: string,
    includeInactive: boolean,
    showPassword?: boolean,
  ): Promise<IDbUser | null>
  getById(
    id: number,
    includeInactive: boolean,
    showPassword?: boolean,
  ): Promise<IDbUser | null>
  getCredentials(): Promise<ICredential[]>
  getCredentialById(id: number): Promise<ICredential | null>
  updateStatusById(
    id: number,
    active: boolean,
    transaction?: ITransaction,
  ): Promise<void>
  updatePassword({ id, currentPassword }: IChangePassword): Promise<void>
  updateUserCredential({
    id,
    credentialId,
  }: IChangeUserCredential): Promise<IDbUser>
  selfUpdateById(id: number, data: ISelfUpdate): Promise<IDbUser>
}

export default IUserModel
