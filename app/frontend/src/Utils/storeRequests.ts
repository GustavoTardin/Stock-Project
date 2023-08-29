import { api } from './requests';

const createStore = async (storeData: FormData) => {
  await api.post('/store/create', storeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { createStore };
