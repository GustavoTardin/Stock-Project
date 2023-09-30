import ISale from '../interfaces/sales/ISale';
import AbstractODM from './AbstractODM';
import saleSchema from './Schemas/sales/saleSchema';

class SaleODM extends AbstractODM<ISale> {
  constructor() {
    super(saleSchema, 'Sale');
  }
}

export default SaleODM;