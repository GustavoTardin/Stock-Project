import { useState } from 'react';
import NavBar from '../../components/Navbar';
import NewUserForm from '../../components/Admin/User/creation/NewUserForm';
import EditUsers from '../../components/Admin/User/edit/EditUsers';

function UserManagement() {
  const [create, createSetter] = useState(false);
  const [edit, editSetter] = useState(false);

  const showForm = () => {
    createSetter((prev) => !prev);
    editSetter(false);
  };

  const showEdit = () => {
    editSetter((prev) => !prev);
    createSetter(false);
  };

  return (
    <div>
      <NavBar />
      <button onClick={ showForm }>Criar novo colaborador</button>
      <button onClick={ showEdit }>Administrar colaboradores</button>
      {create && <NewUserForm />}
      { edit && <EditUsers /> }
    </div>
  );
}

export default UserManagement;
