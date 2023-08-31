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
    { path: 'usuarios', element: <UserManagement /> },
    { path: 'produtos', element: <ProductManagement /> },
    { path: 'lojas', element: <StoreManagement /> },
    { path: 'valuation', element: <Valuation /> },
  ];

  const auth = useAuthUser();
  if (!auth) return <Navigate to="/" replace />;
  const { credential } = auth() as AuthStateUserObject;
  const isAdmin = credential === 'Administrador';
  const storeAccess = isAdmin || credential === 'lojista';
  const stockAccess = isAdmin || credential === 'Estoquista';

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
        path="/produtos-em-falta"
        element={
          <RequireAuth loginPath="/">
            <LowStockItems />
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
