import React from 'react';
import { Avatar } from '../../../components/ui/Avatar';
import { MapPin, Mail } from 'lucide-react';
import { OrderCustomer } from '../types/order.types';

interface CustomerSummaryCardProps {
  customer: OrderCustomer;
  shippingAddress: string;
}

export const CustomerSummaryCard: React.FC<CustomerSummaryCardProps> = ({
  customer,
  shippingAddress,
}) => {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 text-xs">
      <div className="flex items-center gap-3">
        <Avatar src={customer.avatar} name={customer.name} size="md" />
        <div>
          <h5 className="font-bold text-slate-900 dark:text-slate-100">{customer.name}</h5>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <Mail className="w-3 h-3" /> {customer.email}
          </p>
        </div>
      </div>
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 flex items-start gap-2">
        <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
        <span className="leading-relaxed">{shippingAddress}</span>
      </div>
    </div>
  );
};
