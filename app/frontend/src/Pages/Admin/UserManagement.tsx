import { useState } from 'react';
import NavBar from '../../Components/Navbar';
import NewUserForm from '../../Components/Admin/User/creation/NewUserForm';
import EditUsers from '../../Components/Admin/User/edit/EditUsers';

function UserManagement() {
  const [create, createSetter] = useState(false);
  const [edit, editSetter] = useState(false);

  const showForm = () => {
    createSetter(!create);
    editSetter(false);
  };

  const showEdit = () => {
    editSetter(!edit);
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
