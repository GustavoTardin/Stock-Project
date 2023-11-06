import { ChangeEvent } from 'react';
import TNewUser from './TypeNewUser';

function SelectCredential({ userDataSetter }: {
  userDataSetter: React.Dispatch<React.SetStateAction<TNewUser>>,
}) {
  const handleCredential = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    userDataSetter((prevData) => ({
      ...prevData,
      credential: value,
    }));
  };

  return (
    <label htmlFor="credential">
      Função
      <select
        name="credential"
        id="credential"
        onChange={ handleCredential }
      >
        <option value="Administrador">Administrador</option>
        <option value="Lojista">Lojista</option>
        <option value="Estoquista">Estoquista</option>
      </select>
    </label>
  );
}

export default SelectCredential;
