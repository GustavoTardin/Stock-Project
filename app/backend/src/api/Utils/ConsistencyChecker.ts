/* eslint-disable no-param-reassign */
import CustomError from '../Errors/CustomError';
// eslint-disable-next-line import/no-cycle
import { StoreODM, UserODM } from '../Models';
import { IStoreODM } from '../interfaces/stores';
import { IUser, IUserODM } from '../interfaces/users';

class ConsistencyChecker {
  private static _UserODM: IUserODM = new UserODM();
  private static _StoreODM: IStoreODM = new StoreODM();

  static checkStoreName = async (user: IUser) => {
    const storeNames = await this._StoreODM.getStoreNames();
    if (!(user.store.every((e) => storeNames.includes(e)))) {
      throw new CustomError('Esta loja não existe no banco de dados!', '400');
    }
    if (user.credential === 'Adminstrador' && user.store.length !== storeNames.length) {
      user.store = storeNames;
    }
    return user;
  };
}

export default ConsistencyChecker;