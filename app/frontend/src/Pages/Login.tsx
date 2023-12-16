import { useEffect, useState } from 'react';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import '../index.css';
import { requestLogin } from '../Utils/Requests/requests';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const [isLogged, isLoggedSetter] = useState(false);
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  const tryLogin = async (nickName: string, password: string): Promise<void> => {

      const { token, credentialName, expiresIn, id } = await requestLogin(
        '/users/login',
        { nickName, password },
        );
        if (signIn({
          token,
          expiresIn,
          tokenType: 'Bearer',
          authState: { credentialName, id },
        })) {
          isLoggedSetter(true)
        }

      }
      
      useEffect(() => {
        if (isAuthenticated()) isLoggedSetter(true);
      }, [isAuthenticated]); // perguntar pq ele usava como did mount

  return (
    <main className="bg-background">
    {/* <main className="bg-gradient-to-bl from-black to-background"> */}
    { isLogged && <Navigate to="/menu" replace />};
      <LoginForm tryLogin={ tryLogin } />
    </main>
  );
}
