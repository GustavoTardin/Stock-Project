function AdminCard({ type }: { type: string }) {
  const lowerFirstLetter = (
    input: string,
  ): string => input.charAt(0).toLowerCase() + input.slice(1);

  const removeAccents = (input: string): string => input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const url = removeAccents(lowerFirstLetter(type));
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
