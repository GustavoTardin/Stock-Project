import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <body>
      <h1>Home</h1>
      <button
        onClick={ () => navigate('/painel-administrativo') }
      >
        Painel Administrativo
        {' '}

      </button>
      <button
        onClick={ () => navigate('/novo-pedido') }
      >
        Fazer Pedido
      </button>
      <button
        onClick={ () => navigate('/novo-pedido') }
      >
        Fazer Pedido
      </button>
    </body>
  );
}
