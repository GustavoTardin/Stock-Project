import { Navigate } from "react-router-dom";

function AdminCard({ type }: { type: string }) {
  const removeAccents = (input: string): string => input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const url = removeAccents(type.toLowerCase());
  
  return (
    <>
      <Navigate to={ `/painel-administrativo/${url}` }replace />
      {type}
    </>

  );
}

export default AdminCard
