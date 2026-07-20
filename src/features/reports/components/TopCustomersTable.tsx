import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { TopCustomerAnalytics } from '../types/report.types';
import { Users } from 'lucide-react';

interface TopCustomersTableProps {
  customers?: TopCustomerAnalytics[];
}

export function TopCustomersTable({ customers = [] }: TopCustomersTableProps) {
  const columns = useMemo<ColumnDef<TopCustomerAnalytics>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Customer',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar src={row.original.avatar} name={row.original.name} size="sm" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">{row.original.name}</p>
              <p className="text-[10px] text-slate-400">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'totalOrders',
        header: 'Total Orders',
        cell: ({ row }) => <span className="font-semibold">{row.original.totalOrders}</span>,
      },
      {
        accessorKey: 'totalSpent',
        header: 'Lifetime Value (LTV)',
        cell: ({ row }) => (
          <span className="font-bold text-slate-900 dark:text-slate-100">
            ${row.original.totalSpent.toLocaleString()}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card glass>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Enterprise Accounts (LTV)</CardTitle>
        <Users className="w-5 h-5 text-indigo-500" />
      </CardHeader>
      <CardContent className="p-0">
        <DataTable columns={columns} data={customers} searchPlaceholder="Filter top accounts..." />
      </CardContent>
    </Card>
  );
}
