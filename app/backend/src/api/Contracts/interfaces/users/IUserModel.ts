import { ICredential, ICompleteUser, IDbUser } from '.'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string): Promise<IDbUser | null>
  createUser(user: ICompleteUser): Promise<IDbUser>
  getCredentials(): Promise<ICredential[]>
}

export default IUserModel
