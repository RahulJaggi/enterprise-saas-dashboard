import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Avatar } from '../../../components/ui/Avatar';
import { Button } from '../../../components/ui/Button';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Order } from '../types/order.types';
import { Eye, FileText } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  isLoading?: boolean;
  isError?: boolean;
  onViewOrder: (order: Order) => void;
  onOpenInvoice: (order: Order) => void;
}

export function OrderTable({
  orders,
  isLoading = false,
  isError = false,
  onViewOrder,
  onOpenInvoice,
}: OrderTableProps) {
  const columns = useMemo<ColumnDef<Order>[]>(
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
        accessorKey: 'orderNumber',
        header: 'Order Reference',
        cell: ({ row }) => {
          const o = row.original;
          return (
            <div>
              <p className="font-bold font-mono text-slate-900 dark:text-slate-100">{o.orderNumber}</p>
              <p className="text-[10px] text-slate-400 font-mono">{o.createdAt}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => {
          const c = row.original.customer;
          return (
            <div className="flex items-center gap-3">
              <Avatar src={c.avatar} name={c.name} size="sm" />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{c.name}</p>
                <p className="text-[10px] text-slate-400">{c.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'products',
        header: 'Items',
        cell: ({ row }) => {
          const count = row.original.products.reduce((acc, p) => acc + p.quantity, 0);
          return <span className="font-semibold text-slate-700 dark:text-slate-300">{count} items</span>;
        },
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment',
        cell: ({ row }) => {
          const o = row.original;
          return (
            <div>
              <PaymentStatusBadge status={o.paymentStatus} />
              <p className="text-[10px] text-slate-400 mt-0.5">{o.paymentMethod}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'orderStatus',
        header: 'Status',
        cell: ({ row }) => <OrderStatusBadge status={row.original.orderStatus} />,
      },
      {
        accessorKey: 'total',
        header: 'Total Amount',
        cell: ({ row }) => (
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            ${row.original.total.toLocaleString()}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const o = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <Button variant="ghost" size="sm" onClick={() => onViewOrder(o)} title="View Order Details">
                <Eye className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onOpenInvoice(o)} title="Preview Invoice">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onViewOrder, onOpenInvoice]
  );

  return (
    <DataTable
      columns={columns}
      data={orders}
      isLoading={isLoading}
      isError={isError}
      searchPlaceholder="Search orders by number, customer, or payment status..."
    />
  );
}
