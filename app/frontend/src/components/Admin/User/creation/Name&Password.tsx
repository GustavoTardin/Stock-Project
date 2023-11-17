import { ChangeEvent } from 'react';
import TNewUser from './TypeNewUser';

function NamePassword({ userDataSetter, userName, password }: {
  userDataSetter: React.Dispatch<React.SetStateAction<TNewUser>>,
  userName: string,
  password: string
}) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    userDataSetter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        name="userName"
        value={ userName }
        onChange={ handleChange }
        autoComplete="new-user"
      />
      <input
        type="password"
        placeholder="Senha"
        name="password"
        value={ password }
        onChange={ handleChange }
        autoComplete="new-password"
      />
    </div>
  );
}

export default NamePassword;
