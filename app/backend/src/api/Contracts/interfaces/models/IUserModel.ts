import {
  ICredential,
  IDbUser,
  ICompleteUser,
  IChangePassword,
  IChangeUserCredential,
  INames,
} from '../users'
import IModel from './IModel'
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
  updatePassword({ id, currentPassword }: IChangePassword): Promise<void>
  updateUserCredential({
    id,
    credentialId,
  }: IChangeUserCredential): Promise<IDbUser>
  selfUpdateById(id: number, data: ISelfUpdate): Promise<IDbUser>
  getUserNamesById(id: number): Promise<INames | null>
}

export default IUserModel
