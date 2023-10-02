import ISale from '../../Components/Admin/Sales/interfaces/ISale';
import { api } from './requests';

const postSale = async (salesSummary: ISale) => {
  const { data } = await api.post('/sales', salesSummary);
  return data;
};

export { postSale };
