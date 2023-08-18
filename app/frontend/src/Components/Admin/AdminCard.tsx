function AdminCard({ type }: { type: string }) {
  const url = type.charAt(0).toLowerCase() + type.slice(1);
  return (
    <main>
      <h4>
        <a href={ `/painel-administrativo/${url}` }>
          {type}
        </a>
      </h4>
    </main>
  );
}

export default AdminCard;
