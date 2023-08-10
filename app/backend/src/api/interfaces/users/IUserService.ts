import User from '../../Domains/User';

interface IUserService {
  createUser(user: unknown): Promise<User | Error>;
  checkLogin(credentials: unknown): Promise<string | Error>;
}

export default IUserService;