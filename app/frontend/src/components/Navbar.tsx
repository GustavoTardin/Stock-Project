import { useState } from 'react';
import '../Styles/Navbar.css';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import AdminPanel from './Admin/AdminPanel';
import { Theme } from './Theme';

function NavBar() {
  const signOut = useSignOut();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInfo = useAuthUser() as () => AuthStateUserObject;
  const { credential } = userInfo();
  const isAdmin = credential === 'Administrador';
  const storeAccess = isAdmin || credential === 'Lojista';
  const stockAccess = isAdmin || credential === 'Estoquista';

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // se der errado voltar para !isDropdownOpen
  };

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <a href="/menu">Início</a>
        </li>
        {storeAccess && (
          <li>
            <a href="/novo-pedido">Novo Pedido</a>
          </li>
        )}
        <li>
          <a href="/produtos-em-falta">Produtos em falta</a>
        </li>
        {stockAccess && (
          <>
            <li>
              <a href="/pedidos-pendentes">Pedidos pendentes</a>
            </li>
            <li>
              <a href="/reposição-de-produtos">Reposição de produtos</a>
            </li>
          </>
        )}
        {isAdmin && (
          <li>
            <button onClick={ toggleDropdown }>Painel Administrativo</button>
            {isDropdownOpen && (
              <AdminPanel />
            )}
          </li>
        )}
        <li>
          <Theme />
        </li>
        <li>
          {' '}
          <button onClick={ () => signOut() }>Sair</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
