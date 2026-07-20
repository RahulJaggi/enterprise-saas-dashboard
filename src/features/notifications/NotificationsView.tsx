import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Bell, CheckCheck, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { markAsRead, markAllAsRead } from '../../app/notificationSlice';

export const NotificationsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: notifications, unreadCount } = useAppSelector((state) => state.notifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification Center"
        description="System alerts, security broadcasts, and transactional event logs"
        action={
          unreadCount > 0 ? (
            <Button size="sm" variant="outline" leftIcon={<CheckCheck className="w-4 h-4" />} onClick={() => dispatch(markAllAsRead())}>
              Mark All as Read
            </Button>
          ) : undefined
        }
      />

      <Card glass>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-500" /> Notifications Feed
          </CardTitle>
          <Badge variant="info">{unreadCount} Unread</Badge>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => dispatch(markAsRead(n.id))}
              className={`p-4 flex items-start justify-between cursor-pointer transition-colors ${
                !n.isRead ? 'bg-indigo-500/5 dark:bg-indigo-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">{getIcon(n.type)}</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{n.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{n.message}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{n.timestamp}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
