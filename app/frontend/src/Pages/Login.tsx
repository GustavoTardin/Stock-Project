import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import { requestLogin } from '../Utils/requests';
import LoginForm from '../Components/LoginForm';

export default function Login() {
  const [isLogged, isLoggedSetter] = useState(false);
  const signin = useSignIn();

  const tryLogin = async (userName: string, password: string): Promise<void> => {
    const { token, credential } = await requestLogin(
      '/user/login',
      { userName, password },
    );

    signin({
      token,
      expiresIn: 172.800,
      tokenType: 'Bearer',
      authState: { credential },
    });

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
