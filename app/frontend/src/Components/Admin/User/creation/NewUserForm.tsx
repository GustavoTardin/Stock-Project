import { useEffect, useState } from 'react';
import axios from 'axios';
import MultiSelect from './MultiSelect';
import TNewUser from './TypeNewUser';
import SelectCredential from './SelectCredential';
import NamePassword from './Name&Password';
import { createUser } from '../../../../Utils/userRequests';

function NewUserForm() {
  const [userData, userDataSetter] = useState<TNewUser>({
    userName: '',
    password: '',
    credential: 'Administrador',
    stores: [],
  });
  const [apiReturn, apiReturnSetter] = useState('');
  const [isSeller, isSellerSetter] = useState(false);

  const disabledButton = () => {
    return userData.userName.length < 3
     || userData.password.length < 4 || userData.credential.length < 4;
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
    isSellerSetter(userData.credential === 'Lojista');
  }, [userData]);

  return (
    <form action="" autoComplete="off">
      <NamePassword
        userDataSetter={ userDataSetter }
        userName={ userData.userName }
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
