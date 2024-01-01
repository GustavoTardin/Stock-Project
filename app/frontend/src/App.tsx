import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, useAuthUser } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import {
  CreateOrder,
  Home,
  Login,
  LowStockItems,
  PendingOrders,
  StockRefill,

} from './views';
import { ThemeProvider } from './components/theme-provider';
import NotFound from './views/NotFound';
import AdminPanelRoutes from './Routes/AdminPanel.routes';

function App() {

  let isAdmin = false;
  let storeAccess = false;
  let stockAccess = false;

  const auth = useAuthUser();
  if (auth()) {
    const { credentialName } = auth() as AuthStateUserObject;  
    isAdmin = credentialName === 'Admin';
    storeAccess = isAdmin || credentialName === 'lojista';
    stockAccess = isAdmin || credentialName === 'Estoquista';
  }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> </ThemeProvider>
      
      <Routes>
        <Route path={"/"} element={ <Login /> } />
        <Route 
          path={"/menu"}
          element={
            <RequireAuth loginPath={"/"}>
              <Home/>
            </RequireAuth>
          }
        />
        <Route
          path="/produtos-em-falta"
          element={
            <RequireAuth loginPath={"/"}>
              <LowStockItems />
            </RequireAuth>
          }
        />

        <Route path="/painel-administrativo/*" element={
          <RequireAuth loginPath={"/"}>
            <AdminPanelRoutes/>
          </RequireAuth>
        } />
        
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
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
