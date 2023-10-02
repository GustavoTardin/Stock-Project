import { AbstractODM } from '../../Models';
import ISale from './ISale';

interface ISaleODM extends AbstractODM<ISale> {
  createSaleSummary(sale:ISale): Promise<ISale>
}

export default ISaleODM;