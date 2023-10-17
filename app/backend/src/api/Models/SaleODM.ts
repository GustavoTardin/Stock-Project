import ISale from '../interfaces/sales/ISale';
import ISaleODM from '../interfaces/sales/ISaleODM';
import AbstractODM from './AbstractODM';
import saleSchema from './Schemas/sales/saleSchema';

class SaleODM extends AbstractODM<ISale> implements ISaleODM {
  constructor() {
    super(saleSchema, 'Sale');
  }

  createSaleSummary = async (sale: ISale): Promise<ISale> => {
    const newSaleSummary = await this.model.create({ ...sale });
    return newSaleSummary;
  };
}

export default SaleODM;