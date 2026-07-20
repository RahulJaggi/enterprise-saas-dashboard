import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { FileSpreadsheet, Download, FileText, CheckCircle2 } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [reportType, setReportType] = useState('revenue');
  const [format, setFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    await new Promise((res) => setTimeout(res, 800));
    setExporting(false);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Custom Report Builder"
        description="Generate and export fiscal, inventory, and usage reports"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glass className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-500" /> Export Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Select Report Module"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              options={[
                { label: 'Fiscal Revenue & Profitability Ledger', value: 'revenue' },
                { label: 'User Activity & Login Trail', value: 'users' },
                { label: 'Product Licensing & Inventory Consumption', value: 'inventory' },
                { label: 'Security & Audit Logs', value: 'audit' },
              ]}
            />

            <Select
              label="Export Format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              options={[
                { label: 'CSV (Comma Separated Values)', value: 'csv' },
                { label: 'JSON Data Array', value: 'json' },
                { label: 'Formatted PDF Document', value: 'pdf' },
              ]}
            />

            <div className="pt-4 flex items-center justify-between">
              {exported ? (
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Download started ({reportType}-report.{format})
                </span>
              ) : (
                <span className="text-xs text-slate-400">Includes all records up to current timestamp.</span>
              )}

              <Button isLoading={exporting} onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
                Generate & Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card glass className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" /> Saved Report Templates
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Monthly Tax Audit</span>
              <span className="text-slate-400">CSV</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">SOC2 Security Log</span>
              <span className="text-slate-400">JSON</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
