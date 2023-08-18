import AdminCard from './AdminCard';

function AdminPanel() {
  return (
    <>
      <AdminCard type="Usuários" />
      <AdminCard type="Produtos" />
      <AdminCard type="Lojas" />
      <AdminCard type="Valuation" />
    </>
  );
}

export default AdminPanel;
