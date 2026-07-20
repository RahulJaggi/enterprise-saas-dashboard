import React, { useState } from 'react';
import { Sun, Moon, Bell, Search, ShieldAlert, LogOut, CheckCheck } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { logout, loginSuccess } from '../../app/authSlice';
import { markAsRead, markAllAsRead } from '../../app/notificationSlice';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useDarkMode();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { items: notifications, unreadCount } = useAppSelector((state) => state.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 flex items-center justify-between transition-colors duration-200">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search commands, users, logs..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/60 border border-transparent dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
          <ShieldAlert className="w-3 h-3 mr-1" />
          {user?.role || 'Guest'}
        </span>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => dispatch(markAllAsRead())}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto my-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => dispatch(markAsRead(n.id))}
                    className={`py-2.5 px-1 cursor-pointer transition-colors ${
                      !n.isRead ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-slate-400">{user?.department}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-2">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Switch Role</p>
                <div className="flex gap-1">
                  {(['Admin', 'Manager', 'User'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        dispatch(loginSuccess({
                          user: { ...user!, role: r as any },
                          token: `mock-${r.toLowerCase()}-token`
                        }));
                        setShowUserMenu(false);
                      }}
                      className={`px-2 py-1 text-[10px] font-bold rounded-md border ${
                        user?.role === r
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="w-full flex items-center gap-2 px-3 py-2 mt-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
