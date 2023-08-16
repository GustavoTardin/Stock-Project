import { Routes, Route } from 'react-router-dom';
import {
  AdminPanel,
  CreateOrder,
  Home,
  Login,
  LowStockItems,
  PendingOrders,
  StockRefill,
  Valuation,
} from './Pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/menu" element={ <Home /> } />
      <Route path="/painel-administrativo" element={ <AdminPanel /> } />
      <Route path="/novo-pedido" element={ <CreateOrder /> } />
      <Route path="/produtos-em-falta" element={ <LowStockItems /> } />
      <Route path="/pedidos-pendentes" element={ <PendingOrders /> } />
      <Route path="/reposição-de-produtos" element={ <StockRefill /> } />
      <Route path="/valuation" element={ <Valuation /> } />
    </Routes>
  );
}

export default App;
