import IUser from '../Contracts/interfaces/users/IUser';

class User {
  protected id: string | undefined;
  protected userName: string;
  protected credential: string;
  protected stores?: string[];

  constructor(user: IUser) {
    this.id = user.id;
    this.userName = user.userName;
    this.credential = user.credential;
    this.stores = user.stores;
  }
}

export default User;
