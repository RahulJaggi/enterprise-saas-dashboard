import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { ProtectedRouteWrapper } from './protectedRoutes';

import { Login } from '../features/auth/Login';
import { Register } from '../features/auth/Register';
import { ForgotPassword } from '../features/auth/ForgotPassword';

import { DashboardView } from '../features/dashboard/DashboardView';
import { AnalyticsView } from '../features/analytics/AnalyticsView';
import { UsersView } from '../features/users/UsersView';
import { RolesView } from '../features/roles/RolesView';
import { ProductsView } from '../features/products/ProductsView';
import { OrdersView } from '../features/orders/OrdersView';
import { CustomersView } from '../features/customers/CustomersView';
import { NotificationsView } from '../features/notifications/NotificationsView';
import { ProfileView } from '../features/profile/ProfileView';
import { SettingsView } from '../features/settings/SettingsView';
import { ReportsView } from '../features/reports/ReportsView';
import { AuditLogsView } from '../features/audit-logs/AuditLogsView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
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
          { path: '/users', element: <UsersView /> },
          { path: '/roles', element: <RolesView /> },
          { path: '/products', element: <ProductsView /> },
          { path: '/orders', element: <OrdersView /> },
          { path: '/customers', element: <CustomersView /> },
          { path: '/notifications', element: <NotificationsView /> },
          { path: '/profile', element: <ProfileView /> },
          { path: '/settings', element: <SettingsView /> },
          { path: '/reports', element: <ReportsView /> },
          { path: '/audit-logs', element: <AuditLogsView /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
