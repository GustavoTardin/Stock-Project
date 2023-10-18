// import ISale from '../Contracts/interfaces/sales/ISale';
// import ISaleODM from '../Contracts/interfaces/sales/ISaleODM';
// import AbstractODM from './AbstractODM';
// import saleSchema from '../Contracts/mongoSchemas/sales/saleSchema';

// class SaleODM extends AbstractODM<ISale> implements ISaleODM {
//   constructor() {
//     super(saleSchema, 'Sale');
//   }

//   createSaleSummary = async (sale: ISale): Promise<ISale> => {
//     const newSaleSummary = await this.model.create({ ...sale });
//     console.log(newSaleSummary.products[0].profit);
//     return newSaleSummary;
//   };
// }

// export default SaleODM;