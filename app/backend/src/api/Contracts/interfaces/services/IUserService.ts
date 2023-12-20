import { ICredential, IDbUser, ILoginResponse, INames, IToken } from '../users'
import { User } from '../../../Domains'
import IService from './IService'

interface IUserService extends IService<User, IDbUser> {
  getByNickName(nickName: unknown, query: unknown): Promise<User>
  getCredentials(): Promise<ICredential[]>
  login(user: unknown): Promise<ILoginResponse & IToken>
  updatePassword(data: unknown): Promise<string>
  updateUserCredential(data: unknown): Promise<User>
  updateStatusById(data: unknown): Promise<string>
  selfUpdateById(id: number, data: unknown): Promise<User>
  getUserNamesById(id: number): Promise<INames>
}

export default IUserService
