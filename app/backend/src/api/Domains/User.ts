import IUser from '../interfaces/users/IUser';

class User {
  protected _id: string | undefined;
  protected _userName: string;
  protected _credential: string;
  protected _store: string[];

  constructor(user: IUser) {
    this._id = user.id;
    this._userName = user.userName;
    this._credential = user.credential;
    this._store = user.store;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  get name(): string {
    return this._userName;
  }

  set name(name: string) {
    this._userName = name;
  }

  get credential(): string {
    return this._credential;
  }

  set credential(credential: string) {
    this._credential = credential;
  }

  get store(): string[] {
    return this._store;
  }
  
  set store(store: string[]) {
    this._store = store;
  }
}

export default User;