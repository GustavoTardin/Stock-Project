import { ChangeEvent, useState, useEffect } from 'react';

function LoginForm({ tryLogin }: { tryLogin: (
  userName: string, password: string) => Promise<void> }) {
  const [userName, userNameSetter] = useState('');
  const [password, passwordSetter] = useState('');
  const [failedLogin, failedLoginSetter] = useState(false);

  const handleButton = (): boolean => {
    return !(userName.length >= 3 && password.length >= 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tryLogin(userName, password);
    } catch {
      failedLoginSetter(true);
    }
  };

  useEffect(() => {
    failedLoginSetter(false);
  }, [userName, password]);

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
              (failedLogin) && (
                <p>
                  {
                              `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                          }
                </p>
              )
          }
      <button
        disabled={ handleButton() }
        onClick={ handleSubmit }
      >
        Entrar

      </button>
    </form>
  );
}

export default LoginForm;
