import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShieldCheck,
  Package,
  ShoppingCart,
  UserCheck,
  Bell,
  User,
  Settings,
  FileSpreadsheet,
  History,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { toggleSidebar } from '../../app/themeSlice';
import { usePermission } from '../../hooks/usePermission';
import { Permission } from '../../config/permissions';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  permission?: Permission;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Users', path: '/users', icon: <Users className="w-4 h-4" />, permission: 'users:read' },
  { label: 'Roles & Perms', path: '/roles', icon: <ShieldCheck className="w-4 h-4" />, adminOnly: true },
  { label: 'Products', path: '/products', icon: <Package className="w-4 h-4" />, permission: 'products:read' },
  { label: 'Orders', path: '/orders', icon: <ShoppingCart className="w-4 h-4" />, permission: 'orders:read' },
  { label: 'Customers', path: '/customers', icon: <UserCheck className="w-4 h-4" />, permission: 'customers:read' },
  { label: 'Notifications', path: '/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" />, permission: 'settings:read' },
  { label: 'Reports', path: '/reports', icon: <FileSpreadsheet className="w-4 h-4" />, permission: 'reports:read' },
  { label: 'Audit Logs', path: '/audit-logs', icon: <History className="w-4 h-4" />, adminOnly: true },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.theme.sidebarOpen);
  const { role, hasPermission } = usePermission();

  const filteredNavItems = navItems.filter((item) => {
    if (item.adminOnly && role !== 'Admin') return false;
    if (item.permission && !hasPermission(item.permission)) return false;
    return true;
  });

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-slate-900 text-slate-300 border-r border-slate-800/80 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 shadow-lg shadow-indigo-600/30">
            <Layers className="w-5 h-5" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 text-sm tracking-tight whitespace-nowrap">
                Enterprise SaaS
              </span>
              <span className="text-[10px] text-indigo-400 font-mono font-medium tracking-wider">
                ROLE: {role.toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            {sidebarOpen && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Footer Info */}
      {sidebarOpen && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-medium text-slate-400">Role Active: {role}</span>
          </div>
        </div>
      )}
    </aside>
  );
};
