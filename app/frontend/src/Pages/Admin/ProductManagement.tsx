import { useState } from 'react';
import NavBar from '../../Components/Navbar';
import NewProductForm from '../../Components/Admin/Product/Form/NewProductForm';

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
