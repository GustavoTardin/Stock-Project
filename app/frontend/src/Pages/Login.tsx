import { ChangeEvent, useState } from 'react';

export default function Login() {
  const [user, userSetter] = useState('');
  const [password, passwordSetter] = useState('');

  const handleUser = (event:ChangeEvent<HTMLInputElement>): void => {
    userSetter(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    passwordSetter(event.target.value);
  };

  const handleButton = (): boolean => {
    return !(user.length >= 4 && password.length >= 4);
  };

  const tryLogin = (event: React.FormEvent): void => {
    event.preventDefault();
  };

  return (
    <form action="">
      <label htmlFor="user">Nome de Usuário</label>
      <input
        type="text"
        id="user"
        value={ user }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => handleUser(event) }
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={ password }
        onChange={ (event: ChangeEvent<HTMLInputElement>) => handlePassword(event) }
      />
      <button
        disabled={ handleButton() }
        onClick={ tryLogin }
      >
        Entrar

      </button>
    </form>
  );
}
