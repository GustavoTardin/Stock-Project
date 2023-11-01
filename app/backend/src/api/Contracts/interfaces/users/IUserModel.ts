import ICompleteUser from './ICompleteUser'
import IDbUser from './IDbUser'

interface IUserModel {
  getAll(): Promise<IDbUser[]>
  getByNickName(credential: string): Promise<IDbUser | null>
  createUser(user: ICompleteUser): Promise<IDbUser>
}

export default IUserModel
