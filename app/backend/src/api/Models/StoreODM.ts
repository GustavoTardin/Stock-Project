import CustomError from '../Errors/CustomError';
import { IStoreODM } from '../interfaces/stores';
import IStore from '../interfaces/stores/IStore';
import storeSchema from './Schemas/store/storeSchema';
import AbstractODM from './AbstractODM';

class StoreODM extends AbstractODM<IStore> implements IStoreODM {
  constructor() {
    super(storeSchema, 'Store');
  }

  getStoreNames = async () => {
    const storeNamesModel = await this.model.find({}, { name: 1 });
    const storeNames = storeNamesModel.map((store) => store.name);
    return storeNames;
  };

  createStore = async (newStore: IStore) => {
    const duplicateStore = await this.model.findOne({ name: newStore.name });
    if (duplicateStore) throw new CustomError('Nome de loja já em uso!', '409');
  };
}

export default StoreODM;