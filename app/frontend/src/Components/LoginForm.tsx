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
    <div
      className="
        flex justify-center items-center w-screen h-screen
      "
    >
      <form
        action=""
        className="flex flex-col max-w-md text-white gap-5"
      >
        <label
          className="flex flex-col max-w-100 text-xl text-slategrey"
          htmlFor="user"
        >
          Nome de Usuário
          <input
            className="rounded pl-2 p-1"
            type="text"
            placeholder="Digite seu nome de usuário"
            id="user"
            value={ userName }
            onChange={
                (e: ChangeEvent<HTMLInputElement>) => userNameSetter(e.target.value)
              }
          />
        </label>
        <label htmlFor="password" className="flex flex-col text-xl text-slategrey">
          Senha
          <input
            className="rounded pl-2 p-1"
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
          className="my-2 bg-slategrey cursor-pointer hover:bg-buttonHover
            active:bg-buttonClick"
          disabled={ handleButton() }
          onClick={ handleSubmit }
        >
          Entrar

        </button>
      </form>
    </div>
  );
}

export default LoginForm;
