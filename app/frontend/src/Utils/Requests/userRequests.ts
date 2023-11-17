import TNewUser from '../../components/Admin/User/creation/TypeNewUser';
import { api } from './requests';

const getUsernames = async () => {
  const { data } = await api.get('/users/names');
  return data;
};

const createUser = async (userData: TNewUser) => {
  const response = await api.post('/users/create', userData);
  return response;
};

const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};

export {
  getUsernames,
  createUser,
  getUsers,
  deleteUser,
};
