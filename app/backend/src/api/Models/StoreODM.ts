import { IStoreODM } from '../Contracts/interfaces/stores';
import IStore from '../Contracts/interfaces/stores/IStore';
import storeSchema from '../Contracts/mongoSchemas/store/storeSchema';
import AbstractODM from './AbstractODM';
import CustomError from '../Errors/CustomError';

class StoreODM extends AbstractODM<IStore> implements IStoreODM {
  constructor() {
    super(storeSchema, 'Store');
  }

  getStoreNames = async (name = ''): Promise<string[]> => {
    const storeNamesModel = await this.model.find(
      name ? { name } : {},
      { name: 1 },
    );
    const storeNames = storeNamesModel.map((store) => store.name);
    return storeNames;
  };

  createStore = async (store: IStore): Promise<IStore> => {
    const duplicatedStoreName = await this.getStoreNames(store.name);
    if (duplicatedStoreName.length > 0) throw new CustomError('Nome de loja já em uso!', '409');
    const newStore = await this.model.create({ ...store });
    return newStore;
  };
}

export default StoreODM;