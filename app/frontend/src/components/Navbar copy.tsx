// import { useState } from 'react';
import '../Styles/Navbar.css';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import AdminPanel from './Admin/AdminPanel';
import { Theme } from './Theme';

function NavBar() {
  const signOut = useSignOut();

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInfo = useAuthUser() as () => AuthStateUserObject;
  const { credentialName } = userInfo();
  
  const isAdmin = credentialName === 'Admin';
  const storeAccess = isAdmin || credentialName === 'Lojista';
  const stockAccess = isAdmin || credentialName === 'Estoquista';
  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => {
  //     console.log(isDropdownOpen);
      
  //     return !prev
  //   }); // se der errado voltar para !isDropdownOpen
  //   console.log(isDropdownOpen);
  // };
  

  return (
    <nav className="p-5 pr-10">
      <ul className="flex items-center">
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
            <AdminPanel />          
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
