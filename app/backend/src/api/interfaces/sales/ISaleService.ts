import AbstractService from '../../Services/AbstractService';
import ISale from './ISale';
import ISaleODM from './ISaleODM';

interface ISaleService extends AbstractService<ISale, ISaleODM> {
  createSaleSummary(sale: ISale): Promise<ISale>
}

export default ISaleService;