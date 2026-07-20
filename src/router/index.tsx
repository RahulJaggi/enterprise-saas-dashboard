import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { ProtectedRouteWrapper } from './protectedRoutes';
import { RoleGuard } from '../components/auth/RoleGuard';

import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';
import { ForgotPassword } from '../features/auth/ForgotPassword';
import { Forbidden } from '../features/auth/Forbidden';

import { DashboardView } from '../features/dashboard/DashboardView';
import { AnalyticsView } from '../features/analytics/AnalyticsView';
import { UsersPage } from '../features/users/pages/UsersPage';

import { RolesView } from '../features/roles/RolesView';
import { ProductsPage } from '../features/products/pages/ProductsPage';
import { OrdersPage } from '../features/orders/pages/OrdersPage';
import { CustomersPage } from '../features/customers/pages/CustomersPage';
import { NotificationsView } from '../features/notifications/NotificationsView';
import { ProfileView } from '../features/profile/ProfileView';
import { SettingsPage } from '../features/settings/pages/SettingsPage';
import { ReportsPage } from '../features/reports/pages/ReportsPage';
import { AuditLogsView } from '../features/audit-logs/AuditLogsView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/forbidden',
    element: <Forbidden />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <ProtectedRouteWrapper />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/dashboard', element: <DashboardView /> },
          { path: '/analytics', element: <AnalyticsView /> },
          { path: '/products', element: <ProductsPage /> },
          { path: '/orders', element: <OrdersPage /> },
          { path: '/customers', element: <CustomersPage /> },
          { path: '/notifications', element: <NotificationsView /> },
          { path: '/profile', element: <ProfileView /> },
          { path: '/reports', element: <ReportsPage /> },

          // Restricted Admin & Manager routes
          {
            element: <RoleGuard allowedRoles={['Admin', 'Manager']} />,
            children: [{ path: '/users', element: <UsersPage /> }],
          },

          // Restricted Admin-only routes
          {
            element: <RoleGuard allowedRoles={['Admin']} />,
            children: [
              { path: '/roles', element: <RolesView /> },
              { path: '/settings', element: <SettingsPage /> },
              { path: '/audit-logs', element: <AuditLogsView /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
