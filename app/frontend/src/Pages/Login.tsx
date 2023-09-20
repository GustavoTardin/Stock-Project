import { useEffect, useState } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import '../index.css';
import { requestLogin } from '../Utils/requests';
import LoginForm from '../Components/LoginForm';

export default function Login() {
  const [isLogged, isLoggedSetter] = useState(false);
  const signin = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const tryLogin = async (userName: string, password: string): Promise<void> => {
    const { token, credential, expiresIn } = await requestLogin(
      '/user/login',
      { userName, password },
    );

    console.log(expiresIn);

    if (signin({
      token,
      expiresIn,
      tokenType: 'Bearer',
      authState: { credential },
    })) {
      localStorage.setItem('token', token);
      localStorage.setItem('credential', credential);

      isLoggedSetter(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) isLoggedSetter(true);
  }, [isAuthenticated]);

  if (isLogged) return <Navigate to="/menu" />;

  return (
    <main className="bg-red-500 text-white p-4">
      <LoginForm tryLogin={ tryLogin } />
    </main>
  );
}
