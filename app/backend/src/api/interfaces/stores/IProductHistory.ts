interface IProductHistory extends Document {
  quantity: number;
  buyPrice: number;
  salePrice: number;
  profit: number;
  revenue: number;
}
export default IProductHistory;