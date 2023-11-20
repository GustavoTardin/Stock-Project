import { ICredential, IDbUser, ICompleteUser } from '.'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string, login?: boolean): Promise<IDbUser | null>
  createUser(user: ICompleteUser): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
}

export default IUserModel
