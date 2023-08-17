import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../Utils/requests';
import LoginForm from '../Components/LoginForm';

export default function Login() {
  const [isLogged, isLoggedSetter] = useState(false);

  const tryLogin = async (userName: string, password: string): Promise<void> => {
    const { token, credential } = await requestLogin(
      '/user/login',
      { userName, password },
    );
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('credential', credential);

    isLoggedSetter(true);
  };
  if (isLogged) return <Navigate to="/menu" />;

  return (
    <main>
      <LoginForm tryLogin={ tryLogin } />
    </main>
  );
}
