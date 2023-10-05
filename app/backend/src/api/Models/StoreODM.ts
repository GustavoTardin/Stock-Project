import { IStoreODM } from '../Contracts/interfaces/stores';
import IStore from '../Contracts/interfaces/stores/IStore';
import storeSchema from '../Contracts/mongoSchemas/store/storeSchema';
import AbstractODM from './AbstractODM';

class StoreODM extends AbstractODM<IStore> implements IStoreODM {
  constructor() {
    super(storeSchema, 'Store');
  }

  getStoreNames = async (): Promise<string[]> => {
    const storeNamesModel = await this.model.find({}, { name: 1 });
    const storeNames = storeNamesModel.map((store) => store.name);
    return storeNames;
  };

  createStore = async (store: IStore): Promise<IStore> => {
    const newStore = await this.model.create({ ...store });
    return newStore;
  };
}

export default StoreODM;