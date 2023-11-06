import { ChangeEvent, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

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
        className="flex flex-col max-w-md gap-5"
      >
        <label
          className="flex flex-col max-w-100 text-xl"
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
        <label htmlFor="password" className="flex flex-col text-xl">
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

        <Button 
          className="my-2 bg-primary cursor-pointer hover:bg-background
          active:bg-primary"
          disabled={ handleButton() }
          onClick={ handleSubmit }
        >
          Entrar
        </Button>

      </form>
    </div>
  );
}

export default LoginForm;
