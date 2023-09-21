import { api } from './requests';

const createStore = async (storeData: FormData, uploadType: string | null) => {
  const response = await api.post('/stores/create', storeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      uploadType,
    },
  });
  return response;
};

const getStoreNames = async () => {
  const { data } = await api.get('/stores/names');
  return data;
};

export { createStore, getStoreNames };
