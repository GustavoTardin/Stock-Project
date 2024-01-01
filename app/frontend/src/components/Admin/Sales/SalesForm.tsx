import { useState } from 'react';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PlusIcon } from '@heroicons/react/20/solid';
*/
import axios from 'axios';
import { IDate, IProduct } from './interfaces';
import SalesDate from './SalesDate';
import SalesProduct from './SalesProduct';
import ISale from './interfaces/ISale';
import { postSale } from '../../../Service/Requests/salesRequests';

function SalesForm() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [date, setDate] = useState<IDate>({ month: 'Janeiro', year: 2023 });
  const [error, setError] = useState('');

  const addProduct = () => {
    const newProduct = {
      name: '',
      price: 0,
      cost: 0,
      quantity: 0,
    };
    setProducts([...products, newProduct]);
  };

  const registerNewMonth = async () => {
    const databaseValidFormat: ISale = {
      year: date.year,
      month: date.month,
      products,
    };
    try {
      const summary = await postSale(databaseValidFormat);
      console.log(summary);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <form>
      <SalesDate date={ date } setDate={ setDate } />
      <SalesProduct products={ products } setProducts={ setProducts } />
      <button type="button" onClick={ addProduct }>
        Adicionar produto
      </button>
      <br />
      <button type="button" onClick={ registerNewMonth }>Finalizar</button>
      {error && <h4>{error}</h4> }
    </form>
  );
}

export default SalesForm;
