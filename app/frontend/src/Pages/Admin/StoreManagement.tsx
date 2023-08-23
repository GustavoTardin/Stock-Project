import { useState } from 'react';
import NavBar from '../../Components/Navbar';
import NewStoreForm from '../../Components/Admin/Store/NewStoreForm';

function StoreManagement() {
  const [create, createSetter] = useState(false);

  const showForm = () => {
    createSetter(!create);
  };
  /*
*/

  return (
    <body>
      <NavBar />
      <button onClick={ showForm }>Criar nova loja</button>
      <button>Administrar lojas</button>
      {create && <NewStoreForm />}
    </body>
  );
}

export default StoreManagement;
