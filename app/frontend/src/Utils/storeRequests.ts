import { IStoreData } from '../Components/Admin/Store/types';
import { api } from './requests';

const createStore = async (storeData: IStoreData) => {
  await api.post('/store/create', storeData);
};

export { createStore };
