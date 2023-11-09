import { ICredential, IDbUser } from '.'
// ICompleteUser,

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string, login?: boolean): Promise<IDbUser | null>
  // createUser(user: ICompleteUser): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
}

export default IUserModel
