import { User } from '../../../Domains'

interface IUserModel {
  getAll(): Promise<User[]>
  getByNickName(credential: string): Promise<User>
}

export default IUserModel
