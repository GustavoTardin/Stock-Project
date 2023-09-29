import AdminCard from './AdminCard';

function AdminPanel() {
  return (
    <>
      <AdminCard type="Colaboradores" />
      <AdminCard type="Produtos" />
      <AdminCard type="Lojas" />
      <AdminCard type="Valuation" />
      <AdminCard type="Vendas" />
    </>
  );
}

export default AdminPanel;
