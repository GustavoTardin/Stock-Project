// import ConsistencyChecker from '../Utils/ConsistencyChecker';
// import newStoreSchema from '../Contracts/zod/schemas/newStoreSchema';
// import ZodValidation from '../Contracts/zod/ZodValidation';
// import { IStoreODM, IStore } from '../Contracts/interfaces/stores';
// import IStoreService from '../Contracts/interfaces/stores/IStoreService';
// import AbstractService from './AbstractService';

// class StoreService extends AbstractService<IStore, IStoreODM> implements IStoreService {
//   async getStoreNames(): Promise<string[]> {
//     const storeNames = await this.odm.getStoreNames();
//     return storeNames;
//   }

//   async createStore(store: unknown): Promise<IStore | Error> {
//     const storeZod = new ZodValidation(newStoreSchema);
//     storeZod.validateData(store);
//     const validatedStore = store as IStore;
//     const newStore = await this.odm.createStore(validatedStore);
//     return newStore;
//   }
// }

// export default StoreService;