import { Routes, Route, RouteProps } from 'react-router-dom';
import {
  CreateOrder,
  Home,
  Login,
  LowStockItems,
  PendingOrders,
  ProductManagement,
  StockRefill,
  StoreManagement,
  UserManagement,
  Valuation,
} from './Pages';

function App() {
  const adminRoutes: RouteProps[] = [
    { path: 'usuarios', element: <UserManagement /> },
    { path: 'produtos', element: <ProductManagement /> },
    { path: 'lojas', element: <StoreManagement /> },
  ];
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/menu" element={ <Home /> } />
      {adminRoutes.map((route, index) => (
        <Route
          key={ index }
          path={ `/painel-administrativo/${route.path}` }
          element={ route.element }
        />
      ))}
      <Route path="/novo-pedido" element={ <CreateOrder /> } />
      <Route path="/produtos-em-falta" element={ <LowStockItems /> } />
      <Route path="/pedidos-pendentes" element={ <PendingOrders /> } />
      <Route path="/reposição-de-produtos" element={ <StockRefill /> } />
      <Route path="/valuation" element={ <Valuation /> } />
    </Routes>
  );
}

export default App;
