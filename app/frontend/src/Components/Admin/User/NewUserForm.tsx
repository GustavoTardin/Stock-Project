import { useEffect, useState } from 'react';
import axios from 'axios';
import MultiSelect from './creation/MultiSelect';
import TNewUser from './creation/TypeNewUser';
import SelectCredential from './creation/SelectCredential';
import NamePassword from './creation/Name&Password';
import { createUser } from '../../../Utils/userRequests';

function NewUserForm() {
  const [userData, userDataSetter] = useState<TNewUser>({
    name: '',
    password: '',
    credential: 'Administrador',
    stores: [],
  });
  const [apiReturn, apiReturnSetter] = useState('');
  const [isSeller, isSellerSetter] = useState(false);

  const disabledButton = () => {
    return userData.name.length < 4
     || userData.password.length < 5 || userData.credential.length < 4;
  };

  const tryToCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser(userData);
      apiReturnSetter('Colaborador criado com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        apiReturnSetter(errorMessage);
      }
    }
  };

  useEffect(() => {
    apiReturnSetter('');
    isSellerSetter(userData.credential === 'Vendedor');
  }, [userData]);

  return (
    <form action="" autoComplete="off">
      <NamePassword
        userDataSetter={ userDataSetter }
        userName={ userData.name }
        password={ userData.password }
      />
      <SelectCredential userDataSetter={ userDataSetter } />
      {
        isSeller && (
          <MultiSelect userDataSetter={ userDataSetter } stores={ userData.stores } />
        )
      }
      <button onClick={ tryToCreate } disabled={ disabledButton() }>Criar</button>
      { apiReturn && <p>{ apiReturn }</p> }
    </form>
  );
}

export default NewUserForm;
