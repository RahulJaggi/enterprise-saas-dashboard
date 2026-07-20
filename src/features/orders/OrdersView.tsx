import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { LoadingState } from '../../components/common/LoadingState';
import { Search, CreditCard } from 'lucide-react';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '../../services/baseApi';
import { OrderStatus } from '../../types';

export const OrdersView: React.FC = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <LoadingState label="Loading orders..." />;

  const filtered = orders?.filter(
    (o) =>
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders & Subscriptions"
        description="Monitor order fulfillments, wire transfers, and billing statuses"
      />

      <Card glass className="p-4 flex justify-between items-center">
        <div className="w-72">
          <Input
            placeholder="Search order or customer..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">Total Orders: {filtered?.length || 0}</span>
      </Card>

      <Card glass className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 uppercase text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered?.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-100">{ord.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{ord.customerName}</p>
                    <p className="text-[10px] text-slate-400">{ord.customerEmail}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-slate-100">${ord.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <CreditCard className="w-3.5 h-3.5" />
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={ord.status === 'Completed' ? 'success' : ord.status === 'Processing' ? 'info' : 'warning'} size="sm">
                      {ord.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-400">{ord.createdAt}</td>
                  <td className="p-4 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => updateStatus({ id: ord.id, status: e.target.value as OrderStatus })}
                      className="text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Processing">Processing</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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
