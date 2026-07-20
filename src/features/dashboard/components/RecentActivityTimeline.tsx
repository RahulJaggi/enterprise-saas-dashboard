import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { ShieldCheck, UserCheck, Key, FileSpreadsheet } from 'lucide-react';
import { AuditLog } from '../../../types';

interface RecentActivityTimelineProps {
  logs?: AuditLog[];
}

export const RecentActivityTimeline: React.FC<RecentActivityTimelineProps> = ({ logs = [] }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Security':
        return <Key className="w-3.5 h-3.5 text-amber-500" />;
      case 'User Management':
        return <UserCheck className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Data':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Recent Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logs.slice(0, 4).map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 shrink-0 mt-0.5">
              {getIcon(log.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{log.action}</p>
                <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Triggered by <span className="font-semibold text-slate-700 dark:text-slate-300">{log.user}</span> ({log.ipAddress})
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
