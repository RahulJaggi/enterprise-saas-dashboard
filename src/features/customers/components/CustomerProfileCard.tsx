import React from 'react';
import { Avatar } from '../../../components/ui/Avatar';
import { CustomerStatusBadge } from './CustomerStatusBadge';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Customer } from '../types/customer.types';

interface CustomerProfileCardProps {
  customer: Customer;
}

export const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({ customer }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <Avatar src={customer.avatar} name={customer.fullName} size="xl" />
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{customer.fullName}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{customer.id}</p>
        </div>
        <CustomerStatusBadge status={customer.status} />
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
          <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Email Address</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{customer.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
          <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Phone Number</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{customer.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
          <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Billing & Shipping Address</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{customer.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
          <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Customer Since</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{customer.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
