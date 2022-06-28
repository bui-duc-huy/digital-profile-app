import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Keys from './pages/Keys';
import Claims from './pages/Claims';
import { useWallet } from './contexts/useWallet';

// ----------------------------------------------------------------------

export default function Router() {
  const wallet = useWallet()
  let isAuth = true
  if (!wallet.isInstallWallet() || !wallet.isConnected()) {
    isAuth = false
  }
  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'keys', element: <Keys /> },
        { path: 'claims', element: <Claims /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
