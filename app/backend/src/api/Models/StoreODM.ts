import IStore from '../interfaces/stores/IStore';
import AbstractODM from './AbstractODM';
import storeSchema from './Schemas/storeSchema';

class StoreODM extends AbstractODM<IStore> {
  constructor() {
    super(storeSchema, 'Store');
  }

  getStoreNames = async () => {
    const storeNames = await this.model.find({}, { name: 1 });
    return storeNames;
  };
}

export default StoreODM;