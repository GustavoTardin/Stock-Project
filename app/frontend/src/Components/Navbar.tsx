function NavBar() {
  const credential = localStorage.getItem('credential');
  const isAdmin = credential === 'Administrador';
  const storeAcess = isAdmin || credential === 'lojista';
  const stockAcess = isAdmin || credential === 'Estoquista';
  return (
    <ul>
      {(storeAcess) && (
        <li>
          <a href="/novo-pedido">Novo Pedido</a>
        </li>)}
      <li>
        <a href="/produtos-em-falta">Produtos em falta</a>
      </li>
      {stockAcess && (
        <>
          <li>
            <a href="/pedidos-pendentes">Pedidos pendentes</a>
          </li>
          <li>
            <a href="/reposição-de-produtos">Reposição de produtos</a>
          </li>
        </>
      )}
      {
            (isAdmin) && (
              <>
                <li>
                  <a href="/painel-administrativo">Painel Administrativo</a>
                </li>
                <li>
                  <a href="/valuation">Valuation</a>
                </li>
              </>)
}
    </ul>
  );
}

export default NavBar;
