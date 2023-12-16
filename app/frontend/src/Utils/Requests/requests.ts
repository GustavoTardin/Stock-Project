import axios from 'axios';
import ILoginResponse from '../../interfaces/ILoginResponse';
// import { useAuthHeader } from 'react-auth-kit';


const api = axios.create({
  baseURL: 'http://localhost:3009',
});

api.interceptors.request.use((config) => {
  const token = document.cookie.split('; ')
  .find((row) => row.startsWith('_auth='))
  ?.split('=')[1];
 
  config.headers.Authorization = token || '';
  return config;
});

const requestLogin = async (
  endpoint: string,
  body: { nickName: string, password: string },
  ): Promise<ILoginResponse> => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export {
  api,
  requestLogin,
};
