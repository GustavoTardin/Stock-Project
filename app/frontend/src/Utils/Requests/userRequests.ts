import TNewUser from '../../components/Admin/User/creation/TypeNewUser'
import { api } from './requests'


type TId = {
  id: number
}
export type TUpdatePassword = {
  currentPassword: string
  newPassword: string
}

type TUser = TId & {
  firstName: string,
  lastName: string,
  nickName: string,
}

type TStatus = TId & {
  active: boolean
}

type TNewPassword = TId & TUpdatePassword 

const getCredentialName = async () => {
  const { data } = await api.get('/users/credentials');
  return data;
};

const updateUserCredential = async ({id, credentialId}: {id: number, credentialId: number}) => {
  const { data } = await api.patch(`/users/${id}/update-credential`,  { credentialId });
  return data;
};

const updateUser = async ({id, ...newData}: TUser ) => {
  const { data } = await api.patch(`/users/${id}/update-credential`,  newData);
  return data;
};

const createUser = async (data: TNewUser ) => {
  const response = await api.post('/users/create', data)
  console.log(response, 'aqui');
  
  return response;
};

const updatePassword = async (data: TNewPassword) => {
  const {id, ...passwords} = data
  const response = await api.post(`/users/${id}/update-password`, passwords);
  console.log(response, 'aqui');
  
  return response;
};

const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

const getUserById = async ({id}: TId) => {
  const { data } = await api.get(`/users/${id}`)
  return data;
};

const updateUserStatus = async ({active, id}: TStatus) => {
  const { data } = await api.patch(`/users/${id}/update-status`, active);
  return data;
};

export {
  createUser,
  getUsers,
  updateUserStatus,
  getUserById,
  updatePassword,
  getCredentialName,
  updateUser,
  updateUserCredential
};
