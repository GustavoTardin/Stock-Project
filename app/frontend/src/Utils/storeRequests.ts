import { api } from './requests';

const createStore = async (storeData: FormData, uploadType: string) => {
  const response = await api.post('/stores/create', storeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      uploadType,
    },
  });
  return response;
};

export { createStore };
