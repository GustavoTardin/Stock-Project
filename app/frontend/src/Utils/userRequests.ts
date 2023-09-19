import TNewUser from '../Components/Admin/User/creation/TypeNewUser';
import { api } from './requests';

const getUsernames = async () => {
  const { data } = await api.get('/user/names');
  return data;
};

const createUser = async (userData: TNewUser) => {
  const response = await api.post('/user/create', userData);
  return response;
};

const getUsers = async () => {
  const { data } = await api.get('/user');
  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/user/${id}`);
  return data;
};

export {
  getUsernames,
  createUser,
  getUsers,
  deleteUser,
};
