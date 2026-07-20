import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { TopProductAnalytics } from '../types/report.types';
import { Package } from 'lucide-react';

interface TopProductsTableProps {
  products?: TopProductAnalytics[];
}

export function TopProductsTable({ products = [] }: TopProductsTableProps) {
  const columns = useMemo<ColumnDef<TopProductAnalytics>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Product Name / SKU',
        cell: ({ row }) => (
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">{row.original.name}</p>
            <p className="text-[10px] font-mono text-slate-400">{row.original.sku}</p>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <span className="font-semibold">{row.original.category}</span>,
      },
      {
        accessorKey: 'unitsSold',
        header: 'Units Sold',
        cell: ({ row }) => <span className="font-semibold">{row.original.unitsSold.toLocaleString()}</span>,
      },
      {
        accessorKey: 'revenueGenerated',
        header: 'Revenue Generated',
        cell: ({ row }) => (
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            ${row.original.revenueGenerated.toLocaleString()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card glass>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Performing Products & SKUs</CardTitle>
        <Package className="w-5 h-5 text-indigo-500" />
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={products} searchPlaceholder="Filter top products..." />
      </CardContent>
    </Card>
  );
}
