import { ChangeEvent, useState } from 'react';

export default function Login() {
  const [user, userSetter] = useState('');
  const [password, passwordSetter] = useState('');

  const handleButton = (): boolean => {
    return !(user.length >= 3 && password.length >= 4);
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
        onChange={ (e: ChangeEvent<HTMLInputElement>) => userSetter(e.target.value) }
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={ password }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => passwordSetter(e.target.value) }
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
