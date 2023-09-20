import { useState } from 'react';
import '../Styles/Navbar.css';
import { useSignOut } from 'react-auth-kit';
import AdminPanel from './Admin/AdminPanel';

function NavBar() {
  const signOut = useSignOut();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const credential = localStorage.getItem('credential');
  const isAdmin = credential === 'Administrador';
  const storeAccess = isAdmin || credential === 'lojista';
  const stockAccess = isAdmin || credential === 'Estoquista';

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          {' '}
          <button onClick={ () => signOut() }>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
