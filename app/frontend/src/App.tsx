import { Routes, Route, RouteProps, Navigate } from 'react-router-dom';
import { RequireAuth, useAuthUser } from 'react-auth-kit';
import { ReactElement } from 'react';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
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
    { path: 'colaboradores', element: <UserManagement /> },
    { path: 'produtos', element: <ProductManagement /> },
    { path: 'lojas', element: <StoreManagement /> },
    { path: 'valuation', element: <Valuation /> },
  ];

  let isAdmin = false;
  let storeAccess = false;
  let stockAccess = false;

  const auth = useAuthUser();
  if (auth()) {
    const { credential } = auth() as AuthStateUserObject;
    isAdmin = credential === 'Administrador';
    storeAccess = isAdmin || credential === 'lojista';
    stockAccess = isAdmin || credential === 'Estoquista';
  }
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route
        path="/menu"
        element={
          <RequireAuth loginPath="/">
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/produtos-em-falta"
        element={
          <RequireAuth loginPath="/">
            <LowStockItems />
          </RequireAuth>
  }
      />
      {adminRoutes.map((route, index) => (
        <Route
          key={ index }
          path={ `/painel-administrativo/${route.path}` }
          element={
            <RequireAuth loginPath="/">
              {isAdmin ? (
                route.element as ReactElement
              ) : (
                <Navigate to="/menu" replace />
              )}
            </RequireAuth>
          }
        />
      ))}

      <Route
        path="/novo-pedido"
        element={
          <RequireAuth loginPath="/">
            {storeAccess ? (
              <CreateOrder />
            ) : (
              <Navigate to="/menu" replace />
            )}
          </RequireAuth>
        }
      />
      <Route
        path="/pedidos-pendentes"
        element={
          <RequireAuth loginPath="/">
            {stockAccess ? (
              <PendingOrders />
            ) : (
              <Navigate to="/menu" replace />
            )}
          </RequireAuth>
        }
      />
      <Route
        path="/reposição-de-produtos"
        element={
          <RequireAuth loginPath="/">
            {stockAccess ? (
              <StockRefill />
            ) : (
              <Navigate to="/menu" replace />
            )}
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
