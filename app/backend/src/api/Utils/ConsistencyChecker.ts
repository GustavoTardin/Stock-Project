import CustomError from '../Errors/CustomError';
import { StoreODM, UserODM } from '../Models';
import { IStore, IStoreODM } from '../interfaces/stores';
import { IUser, IUserODM } from '../interfaces/users';

class ConsistencyChecker {
  private static _UserODM: IUserODM = new UserODM();
  private static _StoreODM: IStoreODM = new StoreODM();

  static checkUserConsistency = async (user: IUser) => {
    const users = await this._UserODM.getAll();
    const duplicateUsername = users.find((e) => e.userName === user.userName);
    if (duplicateUsername) throw new CustomError('Nome de usuário já em uso!', '409');
    if (user.stores) {
      const storeNames = await this._StoreODM.getStoreNames();
      if (!(user.stores.every((e) => storeNames.includes(e)))) {
        throw new CustomError('Esta loja não existe no banco de dados!', '400');
      }
    }
  };

  static checkStoreConsistency = async (store: IStore) => {
    const storeNames = await this._StoreODM.getStoreNames();
    const duplicateStoreName = storeNames.find((e) => e === store.name);
    if (duplicateStoreName) throw new CustomError('Nome de loja já em uso!', '409');
  };
}

export default ConsistencyChecker;