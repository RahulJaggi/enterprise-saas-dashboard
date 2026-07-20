import React from 'react';
import { Drawer } from '../../../components/ui/Drawer';
import { CustomerProfileCard } from './CustomerProfileCard';
import { CustomerOrderHistory } from './CustomerOrderHistory';
import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { Customer } from '../types/customer.types';

interface CustomerDrawerProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  if (!customer) return null;

  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Customer Account Metrics" size="md">
      <div className="space-y-6">
        <CustomerProfileCard customer={customer} />

        {/* Financial Stat Cards Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <DollarSign className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Spent</p>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">
              ${customer.totalSpent.toLocaleString()}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <ShoppingBag className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
            <p className="text-[10px] uppercase font-bold text-slate-400">Total Orders</p>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">{customer.totalOrders}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <TrendingUp className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-[10px] uppercase font-bold text-slate-400">Avg Order</p>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">
              ${Math.round(avgOrderValue).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Customer Order History */}
        <CustomerOrderHistory orders={customer.orderHistory} />
      </div>
    </Drawer>
  );
};
