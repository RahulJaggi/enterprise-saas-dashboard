import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Building2, Info, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const AboutSettingsTab: React.FC = () => {
  return (
    <Card glass>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-500" /> About Enterprise SaaS Platform
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-md">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Enterprise SaaS Dashboard Platform
            </h4>
            <p className="text-xs text-slate-500">
              Production-ready multi-tenant SaaS frontend built with React 19, TypeScript strict mode, RTK Query, and Tailwind CSS v4.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-indigo-500" /> App Version
              </span>
              <Badge variant="info" size="sm">v2.4.0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Build Hash</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">build-20260720-prod</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Environment</span>
              <Badge variant="success" size="sm">Production</Badge>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Active License
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Enterprise SaaS Tier</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" /> Engine Architecture
              </span>
              <span className="font-mono text-slate-700 dark:text-slate-300">Vite 6 + React 19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Company</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Enterprise SaaS Inc.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
