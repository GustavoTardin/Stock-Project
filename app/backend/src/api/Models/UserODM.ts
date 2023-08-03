import IUser from '../interfaces/users/IUser';
import AbstractODM from './AbstractODM';
import userSchema from './Schemas/userSchema';

class UserODM extends AbstractODM<IUser> {
  constructor() {
    super(userSchema, 'User');
  }
}

export default UserODM;