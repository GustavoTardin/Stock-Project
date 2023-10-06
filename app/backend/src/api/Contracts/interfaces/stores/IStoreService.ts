import AbstractService from '../../../Services/AbstractService';
import IStore from './IStore';
import IStoreODM from './IStoreODM';

interface IStoreService extends AbstractService<IStore, IStoreODM> {
  getStoreNames(): Promise<string[]>;
  createStore(store: unknown): Promise<IStore | Error>;
}

export default IStoreService;