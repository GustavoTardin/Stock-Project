import * as bcrypt from 'bcrypt';
import CustomError from '../Errors/CustomError';
import IUser from '../interfaces/users/IUser';
import AbstractODM from './AbstractODM';
import userSchema from './Schemas/userSchema';

class UserODM extends AbstractODM<IUser> {
  constructor() {
    super(userSchema, 'User');
  }

  checkLogin = async (userName: string, password: string) => {
    const user = await this.model.findOne({ userName });
    if (!user) throw new CustomError('Invalid username or password', '404');
    if (bcrypt.compareSync(password, user.password)) {
      console.log('calmou');
    }
  };
}

export default UserODM;