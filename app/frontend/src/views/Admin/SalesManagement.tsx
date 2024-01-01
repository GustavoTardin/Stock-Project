import { useState } from 'react';
import SalesForm from '../../components/Admin/Sales/SalesForm';
import NavBar from '../../components/Navbar';

function SalesManagement() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <NavBar />
      <button
        type="button"
        onClick={ () => setShowForm(!showForm) }
      >
        Registrar novo mês

      </button>
      <button type="button">Histórico de vendas</button>
      {showForm && <SalesForm />}
    </div>
  );
}

export default SalesManagement;
