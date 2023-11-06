import { useState } from 'react';
import NavBar from '../../components/Navbar';
import NewStoreForm from '../../components/Admin/Store/NewStoreForm';

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
      <button onClick={ showForm }>Criar nova loja</button>
      <button>Administrar lojas</button>
      {create && <NewStoreForm />}
    </div>
  );
}

export default StoreManagement;
