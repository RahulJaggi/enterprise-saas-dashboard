import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { Customer } from '../types/customer.types';
import { Eye } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
  isError?: boolean;
  onViewCustomer: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  isLoading = false,
  isError = false,
  onViewCustomer,
}: CustomerTableProps) {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'fullName',
        header: 'Customer',
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar src={c.avatar} name={c.fullName} size="sm" />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{c.fullName}</p>
                <p className="text-[11px] text-slate-400">{c.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'phone',
        header: 'Contact Phone',
        cell: ({ row }) => <span className="font-mono text-slate-600 dark:text-slate-400">{row.original.phone}</span>,
      },
      {
        accessorKey: 'totalOrders',
        header: 'Orders',
        cell: ({ row }) => <span className="font-semibold">{row.original.totalOrders}</span>,
      },
      {
        accessorKey: 'totalSpent',
        header: 'Total Spent',
        cell: ({ row }) => (
          <span className="font-bold text-slate-900 dark:text-slate-100">
            ${row.original.totalSpent.toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'lastPurchase',
        header: 'Last Purchase',
        cell: ({ row }) => <span className="font-mono text-slate-400">{row.original.lastPurchase}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <CustomerStatusBadge status={row.original.status} />,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex items-center justify-end">
              <Button variant="ghost" size="sm" onClick={() => onViewCustomer(c)} title="View Customer Details">
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onViewCustomer]
  );

  return (
    <DataTable
      columns={columns}
      data={customers}
      isLoading={isLoading}
      isError={isError}
      searchPlaceholder="Search customers by name, email, or phone..."
    />
  );
}
