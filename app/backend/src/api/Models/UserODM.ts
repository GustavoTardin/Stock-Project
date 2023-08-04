import * as bcrypt from 'bcrypt';
import CustomError from '../Errors/CustomError';
import IUser from '../interfaces/users/IUser';
import AbstractODM from './AbstractODM';
import userSchema from './Schemas/userSchema';
import Jwt from '../Auth/Jwt';

class UserODM extends AbstractODM<IUser> {
  constructor() {
    super(userSchema, 'User');
  }

  checkLogin = async (userName: string, password: string) => {
    try {
      const user = await this.model.findOne({ userName });
      if (!user) throw new CustomError('Invalid username or password', '404');
      if (!bcrypt.compareSync(password, user.password)) {
        throw new CustomError('Invalid username or password', '404');
      } else {
        const payload = {
          id: user._id,
          userName,
          credential: user.credential,
          store: user.store,
        }; 
        const token = Jwt.generateToken(payload);
        return token;
      }
    } catch {
      throw new CustomError('Sorry, some error happened on our server :(', '500');
    }
  };
}

export default UserODM;