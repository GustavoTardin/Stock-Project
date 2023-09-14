import ConsistencyChecker from '../Utils/ConsistencyChecker';
import newStoreSchema from '../Utils/Joi/JoiSchemas/newStoreSchema';
import JoiValidation from '../Utils/Joi/JoiValidation';
import { IStoreODM, IStore } from '../interfaces/stores';
import IStoreService from '../interfaces/stores/IStoreService';
import AbstractService from './AbstractService';

class StoreService extends AbstractService<IStore, IStoreODM> implements IStoreService {
  async getStoreNames(): Promise<string[]> {
    const storeNames = await this.odm.getStoreNames();
    return storeNames;
  }

  async createStore(store: unknown): Promise<IStore | Error> {
    const storeJoi = new JoiValidation(newStoreSchema);
    storeJoi.validateData(store);
    const validatedStore = store as IStore;
    await ConsistencyChecker.checkStoreConsistency(validatedStore);
    const newStore = await this.odm.createStore(validatedStore);
    return newStore;
  }
}

export default StoreService;