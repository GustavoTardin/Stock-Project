import { useState } from 'react';
import NavBar from '../../Components/Navbar';
import NewUserForm from '../../Components/Admin/User/NewUserForm';

function UserManagement() {
  const [create, createSetter] = useState(false);

  const showForm = () => {
    createSetter(!create);
  };
  /*
*/

  return (
    <div>
      <NavBar />
      <button onClick={ showForm }>Criar novo colaborador</button>
      <button>Administrar colaboradores</button>
      {create && <NewUserForm />}
    </div>
  );
}

export default UserManagement;
