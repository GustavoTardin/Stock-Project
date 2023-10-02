import ISale from '../interfaces/sales/ISale';
import ISaleODM from '../interfaces/sales/ISaleODM';
import AbstractService from './AbstractService';

class SaleService extends AbstractService<ISale, ISaleODM> {
  createSaleSummary = async (sale: ISale) => {
    const newSaleSummary = await this.odm.createSaleSummary(sale);
    return newSaleSummary;
  };
}

export default SaleService;