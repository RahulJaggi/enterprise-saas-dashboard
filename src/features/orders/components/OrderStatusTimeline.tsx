import React from 'react';
import { CheckCircle2, Clock, Truck, ShieldCheck, XCircle } from 'lucide-react';
import { OrderStatus } from '../types/order.types';

interface OrderStatusTimelineProps {
  status: OrderStatus;
}

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ status }) => {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold">
        <XCircle className="w-4 h-4 shrink-0" />
        <span>This order has been cancelled and refunded.</span>
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', icon: Clock, completed: true },
    { label: 'Payment Verified', icon: ShieldCheck, completed: true },
    { label: 'Processing SKU', icon: Clock, completed: status !== 'Processing' },
    { label: 'Shipped', icon: Truck, completed: status === 'Shipped' || status === 'Completed' },
    { label: 'Completed', icon: CheckCircle2, completed: status === 'Completed' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase font-bold text-slate-400">Order Fulfillment Lifecycle</p>
      <div className="flex items-center justify-between gap-2 text-xs">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex flex-col items-center gap-1 text-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  s.completed
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={`text-[10px] font-bold ${
                  s.completed ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
