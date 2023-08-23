import { api } from './requests';

const getUsernames = async () => {
  const { data } = await api.get('/user/names');
  return data;
};

export {
  getUsernames,
};
