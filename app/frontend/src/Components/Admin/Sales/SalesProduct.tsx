import { IProduct } from './interfaces';

interface IProps {
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

function SalesProduct({ products, setProducts }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, name } = e.target;
    console.log(name);
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: name === 'name' ? value : parseFloat(value),
    };
    setProducts(updatedProducts);
  };

  return (
    products.map((product, index) => (
      <div key={ index }>
        <label htmlFor={ `${index} name` }>
          Nome do produto:
          <input
            type="text"
            id={ `${index} name` }
            name="name"
            value={ product.name }
            onChange={ (e) => handleChange(e, index) }
          />
        </label>
        <label htmlFor={ `${index} cost` }>
          Valor de compra:
          <input
            id={ `${index} cost` }
            type="number"
            name="cost"
            value={ product.cost }
            onChange={ (e) => handleChange(e, index) }
          />
        </label>
        <label htmlFor={ `${index} price` }>
          Valor de venda:
          <input
            id={ `${index} price` }
            type="number"
            name="price"
            value={ product.price }
            onChange={ (e) => handleChange(e, index) }
          />
        </label>
        <label htmlFor={ `${index} quantity` }>
          Quantidade vendida:
          <input
            id={ `${index} quantity` }
            type="number"
            name="quantity"
            value={ product.quantity }
            onChange={ (e) => handleChange(e, index) }
          />
        </label>
      </div>
    ))
  );
}

export default SalesProduct;
