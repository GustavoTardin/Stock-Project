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
    <form action="" className="bg-red-500 text-white p-4">
      <label htmlFor="user">
        Nome de Usuário
        <input
          type="text"
          placeholder="Digite seu nome de usuário"
          id="user"
          value={ userName }
          onChange={
             (e: ChangeEvent<HTMLInputElement>) => userNameSetter(e.target.value)
            }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          placeholder="Digite sua senha"
          id="password"
          value={ password }
          onChange={
             (e: ChangeEvent<HTMLInputElement>) => passwordSetter(e.target.value)
}
        />
      </label>
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
