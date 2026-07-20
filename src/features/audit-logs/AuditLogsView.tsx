import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { LoadingState } from '../../components/common/LoadingState';
import { Search, ShieldAlert } from 'lucide-react';
import { useGetAuditLogsQuery } from '../../services/baseApi';

export const AuditLogsView: React.FC = () => {
  const { data: logs, isLoading } = useGetAuditLogsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <LoadingState label="Loading audit logs trail..." />;

  const filtered = logs?.filter(
    (l) =>
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ipAddress.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Trail & Security Logs"
        description="Immutable system log events, security triggers, and IP origin tracking"
      />

      <Card glass className="p-4 flex justify-between items-center">
        <div className="w-72">
          <Input
            placeholder="Search by action, user, or IP..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">Logged Events: {filtered?.length || 0}</span>
      </Card>

      <Card glass className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Category</th>
                <th className="p-4">IP Address</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filtered?.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors text-[11px]">
                  <td className="p-4 text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-sans font-semibold text-slate-900 dark:text-slate-100">{log.user}</td>
                  <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400">{log.action}</td>
                  <td className="p-4 font-sans">
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <ShieldAlert className="w-3 h-3 text-slate-400" />
                      {log.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{log.ipAddress}</td>
                  <td className="p-4 text-right font-sans">
                    <Badge variant={log.status === 'Success' ? 'success' : 'warning'} size="sm">
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
