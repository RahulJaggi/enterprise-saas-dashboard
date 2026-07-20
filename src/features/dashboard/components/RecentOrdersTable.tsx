import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Activity } from 'lucide-react';
import { Order } from '../../../types';

interface RecentOrdersTableProps {
  orders?: Order[];
}

export const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders = [] }) => {
  return (
    <Card glass>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Activity className="w-4 h-4 text-indigo-400" />
      </CardHeader>
      <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800/60">
        {orders.slice(0, 4).map((order) => (
          <div
            key={order.id}
            className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</p>
              <p className="text-[10px] text-slate-400 font-mono">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                ${order.amount.toLocaleString()}
              </p>
              <Badge variant={order.status === 'Completed' ? 'success' : 'warning'} size="sm">
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
