import { useState } from 'react';
import NavBar from '../../components/Navbar';
import NewProductForm from '../../components/Admin/Product/Form/NewProductForm';

function StoreManagement() {
  const [create, createSetter] = useState(false);

  const showForm = () => {
    createSetter(!create);
  };
  /*
*/

  return (
    <div>
      <NavBar />
      <button onClick={ showForm }>Criar novo produto</button>
      <button>Administrar produtos</button>
      {create && <NewProductForm />}
    </div>
  );
}

export default StoreManagement;
