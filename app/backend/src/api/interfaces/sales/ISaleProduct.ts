interface ISaleProduct {
  name: string,
  price: number,
  cost: number,
  quantity: number,
  profit?:number,
  revenue?: number
}

export default ISaleProduct;