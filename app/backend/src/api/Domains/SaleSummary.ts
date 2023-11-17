// import ISale from '../Contracts/interfaces/sales/ISale';
// import ISaleProduct from '../Contracts/interfaces/sales/ISaleProduct';

// class SaleSummary {
//   protected id: string | undefined;
//   protected month: string;
//   protected year: number;
//   protected products: ISaleProduct[];

//   constructor(sale: ISale) {
//     this.id = sale.id;
//     this.month = sale.month;
//     this.year = sale.year;
//     const completeProducts = sale.products.map((e) => ({
//       name: e.name,
//       price: e.price,
//       cost: e.cost,
//       quantity: e.quantity,
//       profit: e.profit,
//       revenue: e.revenue,
//     }));
//     this.products = completeProducts;
//   }
// }

// export default SaleSummary;
