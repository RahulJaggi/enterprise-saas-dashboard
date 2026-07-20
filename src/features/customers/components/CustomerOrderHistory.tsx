import React from 'react';
import { CustomerOrderHistoryItem } from '../types/customer.types';
import { Badge } from '../../../components/ui/Badge';
import { ShoppingBag } from 'lucide-react';

interface CustomerOrderHistoryProps {
  orders?: CustomerOrderHistoryItem[];
}

export const CustomerOrderHistory: React.FC<CustomerOrderHistoryProps> = ({ orders = [] }) => {
  if (!orders.length) {
    return (
      <div className="p-4 text-center text-slate-400 text-xs">
        No past order transaction records found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
        <ShoppingBag className="w-3.5 h-3.5 text-indigo-500" /> Recent Order History
      </p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
        {orders.map((ord) => (
          <div key={ord.id} className="p-3 flex items-center justify-between">
            <div>
              <p className="font-mono font-bold text-slate-800 dark:text-slate-200">{ord.orderNumber}</p>
              <p className="text-[10px] text-slate-400 font-mono">{ord.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900 dark:text-slate-100">${ord.total.toLocaleString()}</p>
              <Badge variant="success" size="sm">{ord.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
