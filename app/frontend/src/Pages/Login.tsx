import { useEffect, useState } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import '../index.css';
import { requestLogin } from '../Utils/Requests/requests';
import LoginForm from '../Components/LoginForm';

export default function Login() {
  const [isLogged, isLoggedSetter] = useState(false);
  const signin = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const tryLogin = async (userName: string, password: string): Promise<void> => {
    const { token, credential, expiresIn, id } = await requestLogin(
      '/user/login',
      { userName, password },
    );

    if (signin({
      token,
      expiresIn,
      tokenType: 'Bearer',
      authState: { credential, id },
    })) {
      isLoggedSetter(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) isLoggedSetter(true);
  }, [isAuthenticated]);

  if (isLogged) return <Navigate to="/menu" />;

  return (
    <main className="bg-gradient-to-bl from-background2 to-background">
      <LoginForm tryLogin={ tryLogin } />
    </main>
  );
}
