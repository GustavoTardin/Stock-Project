import { ChangeEvent, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../Utils/requests';

export default function Login() {
  const [userName, userNameSetter] = useState('');
  const [password, passwordSetter] = useState('');
  const [failedLogin, failedLoginSetter] = useState(false);
  const [isLogged, isLoggedSetter] = useState(false);

  const handleButton = (): boolean => {
    return !(userName.length >= 3 && password.length >= 4);
  };

  const tryLogin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const { token, credential } = await requestLogin(
        '/user/login',
        { userName, password },
      );
      setToken(token as string);

      localStorage.setItem('token', token);
      localStorage.setItem('credential', credential);

      isLoggedSetter(true);
    } catch {
      failedLoginSetter(true);
    }
  };

  useEffect(() => {
    failedLoginSetter(false);
  }, [userName, password]);

  if (isLogged) return <Navigate to="/menu" />;

  return (
    <form action="">
      <label htmlFor="user">Nome de Usuário</label>
      <input
        type="text"
        id="user"
        value={ userName }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => userNameSetter(e.target.value) }
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={ password }
        onChange={ (e: ChangeEvent<HTMLInputElement>) => passwordSetter(e.target.value) }
      />
      {
        (failedLogin)
          ? (
            <p>
              {
                `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
      <button
        disabled={ handleButton() }
        onClick={ tryLogin }
      >
        Entrar

      </button>
    </form>
  );
}
