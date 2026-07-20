import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Lock, Check, Plus } from 'lucide-react';

interface RoleDefinition {
  name: string;
  description: string;
  usersCount: number;
  isSystem?: boolean;
  permissions: {
    users: boolean;
    products: boolean;
    orders: boolean;
    analytics: boolean;
    reports: boolean;
    settings: boolean;
    auditLogs: boolean;
  };
}

const initialRoles: RoleDefinition[] = [
  {
    name: 'Super Admin',
    description: 'Full un-restricted administrative access to all modules and security settings.',
    usersCount: 1,
    isSystem: true,
    permissions: { users: true, products: true, orders: true, analytics: true, reports: true, settings: true, auditLogs: true },
  },
  {
    name: 'Admin',
    description: 'Operational administrative control excluding root system key modifications.',
    usersCount: 3,
    permissions: { users: true, products: true, orders: true, analytics: true, reports: true, settings: true, auditLogs: false },
  },
  {
    name: 'Manager',
    description: 'Team management capabilities, order processing, and customer reports.',
    usersCount: 8,
    permissions: { users: false, products: true, orders: true, analytics: true, reports: true, settings: false, auditLogs: false },
  },
  {
    name: 'Analyst',
    description: 'Read-only metrics, reporting data export, and business analytics views.',
    usersCount: 12,
    permissions: { users: false, products: false, orders: false, analytics: true, reports: true, settings: false, auditLogs: false },
  },
];

export const RolesView: React.FC = () => {
  const [roles, setRoles] = useState(initialRoles);

  const toggleRolePermission = (roleIndex: number, key: keyof RoleDefinition['permissions']) => {
    if (roles[roleIndex].isSystem) return;
    const updated = [...roles];
    updated[roleIndex].permissions[key] = !updated[roleIndex].permissions[key];
    setRoles(updated);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Access Control"
        description="Configure granular permission matrices and security role hierarchies"
        action={
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create Role
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((r) => (
          <Card key={r.name} glass className="p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge variant={r.isSystem ? 'danger' : 'neutral'} size="sm">
                  {r.isSystem ? 'System Root' : `${r.usersCount} Users`}
                </Badge>
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">{r.name}</h4>
              <p className="mt-1 text-xs text-slate-400">{r.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Permission Matrix Table */}
      <Card glass>
        <CardHeader>
          <CardTitle>Enterprise Security Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Module / Feature</th>
                {roles.map((r) => (
                  <th key={r.name} className="p-4 text-center">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {['users', 'products', 'orders', 'analytics', 'reports', 'settings', 'auditLogs'].map((mod) => (
                <tr key={mod} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 capitalize font-bold text-slate-800 dark:text-slate-200">{mod}</td>
                  {roles.map((r, idx) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const enabled = (r.permissions as any)[mod];
                    return (
                      <td key={r.name} className="p-4 text-center">
                        <button
                          disabled={r.isSystem}
                          onClick={() => toggleRolePermission(idx, mod as keyof RoleDefinition['permissions'])}
                          className={`p-1.5 rounded-lg inline-flex items-center justify-center transition-colors ${
                            enabled
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-400'
                          } ${r.isSystem ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:scale-105'}`}
                        >
                          {r.isSystem ? <Lock className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
