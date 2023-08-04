import IUser from './IUser';

export default interface IUserService {
  getAll(): Promise<IUser[]>
  getById(): Promise<IUser> | Error
}