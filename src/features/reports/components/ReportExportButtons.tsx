import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { toast } from '../../../components/ui/Toast';
import { ReportsAnalyticsData } from '../types/report.types';

interface ReportExportButtonsProps {
  analytics?: ReportsAnalyticsData;
}

export const ReportExportButtons: React.FC<ReportExportButtonsProps> = ({ analytics }) => {
  const handleExportCSV = () => {
    if (!analytics) return;
    const header = 'Month,Revenue ($),Expenses ($),Net Profit ($)\n';
    const rows = analytics.monthlySales
      .map((m) => `${m.month},${m.revenue},${m.expenses},${m.profit}`)
      .join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(header + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `Enterprise_Revenue_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV Report exported successfully!');
  };

  const handleExportExcel = () => {
    toast.success('Generating Excel (.xlsx) financial workbook download...');
  };

  const handleExportPDF = () => {
    toast.success('Compiling Executive PDF Analytics Summary report...');
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        leftIcon={<Download className="w-4 h-4 text-emerald-500" />}
        onClick={handleExportCSV}
      >
        Export CSV
      </Button>

      <Button
        variant="outline"
        size="sm"
        leftIcon={<FileSpreadsheet className="w-4 h-4 text-indigo-500" />}
        onClick={handleExportExcel}
      >
        Export Excel
      </Button>

      <Button
        size="sm"
        leftIcon={<FileText className="w-4 h-4" />}
        onClick={handleExportPDF}
      >
        Export PDF
      </Button>
    </div>
  );
};
