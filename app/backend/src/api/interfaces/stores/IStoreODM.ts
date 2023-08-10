import AbstractODM from '../../Models/AbstractODM';
import IStore from './IStore';

interface IStoreODM extends AbstractODM<IStore> {
  getStoreNames(): Promise<(IStore & {
    _id: string;
  })[]>
}

export default IStoreODM;