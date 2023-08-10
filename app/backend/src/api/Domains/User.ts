import IUser from '../interfaces/users/IUser';

class User {
  protected id: string | undefined;
  protected userName: string;
  protected credential: string;
  protected store: string[];

  constructor(user: IUser) {
    this.id = user.id;
    this.userName = user.userName;
    this.credential = user.credential;
    this.store = user.store;
  }
}

export default User;
