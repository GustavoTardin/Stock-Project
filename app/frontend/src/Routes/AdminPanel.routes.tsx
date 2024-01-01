import EditUser from '@/components/Admin/User/edit/EditUser';
import { ProductManagement, StoreManagement, UserManagement, Valuation } from '@/views';
import SalesManagement from '@/views/Admin/SalesManagement';
import { RequireAuth, useAuthUser } from 'react-auth-kit'
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import { Navigate, Route, Routes } from 'react-router-dom'

export default function AdminPanelRoutes() {

  let isAdmin = false;
  
  const auth = useAuthUser();
  if (auth()) {
    const { credentialName } = auth() as AuthStateUserObject
    isAdmin = credentialName === 'Admin';
    console.log(isAdmin);
    
  }

  return (
    <>
      <Routes>
        <Route
          path={ "colaboradores" }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <UserManagement />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
        <Route
          path={ 'produtos' }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <ProductManagement />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
        <Route
          path={ 'lojas' }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <StoreManagement />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
        <Route
          path={ 'edit-user/:id' }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <EditUser />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
        <Route
          path={ 'vendas' }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <SalesManagement />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
        <Route
          path={ 'valuation' }
          element={
            <RequireAuth loginPath={ "/" }>
              {isAdmin ? (
                <Valuation />
                ) : (
                  <Navigate to="/menu" replace />
                )}
            </RequireAuth>
          }
        />
      </Routes>
    </>
  )
}