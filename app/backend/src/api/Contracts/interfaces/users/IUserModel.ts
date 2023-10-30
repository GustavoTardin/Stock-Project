import ICompleteUser from './ICompleteUser'

interface IUserModel {
  getAll(): Promise<ICompleteUser[]>
}

export default IUserModel
