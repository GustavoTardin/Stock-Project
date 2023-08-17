import '../Styles/Navbar.css';

function NavBar() {
  const credential = localStorage.getItem('credential');
  const isAdmin = credential === 'Administrador';
  const storeAccess = isAdmin || credential === 'lojista';
  const stockAccess = isAdmin || credential === 'Estoquista';

  return (
    <div className="nav-container">
      <ul className="nav-list">
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
          <>
            <li>
              <a href="/painel-administrativo">Painel Administrativo</a>
            </li>
            <li>
              <a href="/valuation">Valuation</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
