import { Navigate } from 'react-router-dom';
import AdminCard from './AdminCard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export default function AdminPanel() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span >Painel Administrativo</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={ () => AdminCard({ type: "Colaboradores" }) }>
          Colaboradores
          <Navigate to={ '/painel-administrativo/colaboradores' }replace />
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={ () => AdminCard({ type: "Produtos" }) }>
          Produtos
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => AdminCard({ type: "Lojas" })  }>
          Lojas
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => AdminCard({ type: "Valuation" })  }>
          Valuation
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ () => AdminCard({ type: "Vendas" })  }>
          Vendas
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}