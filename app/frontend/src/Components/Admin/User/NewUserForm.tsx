import { useEffect, useState } from 'react';
import axios from 'axios';
import { getStoreNames } from '../../../Utils/storeRequests';

function NewUserForm() {
  const [userData, userDataSetter] = useState({
    name: '',
    password: '',
    credential: '',
  });
  const [apiReturn, apiReturnSetter] = useState('');
  const [storeNames, storeNamesSetter] = useState(['']);

  const disabledButton = () => {
    return userData.name.length < 4
     || userData.password.length < 5 || userData.credential.length < 4;
  };

  const tryToCreate = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    const getStores = async () => {
      const names = await getStoreNames();
      storeNamesSetter(names);
    };
    getStores();
  }, []);

  useEffect(() => { apiReturnSetter(''); }, [userData]);

  return (
    <form action="">
      <input
        type="text"
        placeholder="Nome"
        value={ userData.name }
        onChange={ ({ target }) => userDataSetter({ ...userData, name: target.value }) }
      />
      <input
        type="password"
        placeholder="Senha"
        value={ userData.password }
        onChange={
            ({ target }) => userDataSetter({ ...userData, password: target.value })
        }
      />
      <label htmlFor="credential">
        Função
        <select
          name="credential"
          id="credential"
          onChange={
            ({ target }) => userDataSetter({ ...userData, credential: target.value })
}
        >
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Estoquista">Estoquista</option>
        </select>
      </label>
      <button onClick={ tryToCreate } disabled={ disabledButton() }>Criar</button>
      { apiReturn && <p>{ apiReturn }</p> }
    </form>
  );
}

export default NewUserForm;
