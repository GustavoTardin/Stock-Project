import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3009',
});

const requestLogin = async (
  endpoint: string,
  body: { userName: string, password: string },
) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export {
  api,
  requestLogin,
  setToken,
};
