import React from 'react';
import { Drawer } from '../../../components/ui/Drawer';
import { Button } from '../../../components/ui/Button';
import { OrderStatusTimeline } from './OrderStatusTimeline';
import { CustomerSummaryCard } from './CustomerSummaryCard';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { OrderStatusBadge } from './OrderStatusBadge';
import { FileText, CreditCard } from 'lucide-react';
import { Order } from '../types/order.types';

interface OrderDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInvoice: (order: Order) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onOpenInvoice,
}) => {
  if (!order) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Order Specification (${order.orderNumber})`} size="md">
      <div className="space-y-6">
        {/* Status Header */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Order Status</span>
            <div className="mt-1 flex gap-2">
              <OrderStatusBadge status={order.orderStatus} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileText className="w-4 h-4 text-indigo-500" />}
            onClick={() => onOpenInvoice(order)}
          >
            Invoice
          </Button>
        </div>

        {/* Fulfillment Lifecycle Timeline */}
        <OrderStatusTimeline status={order.orderStatus} />

        {/* Customer Info Card */}
        <CustomerSummaryCard customer={order.customer} shippingAddress={order.shippingAddress} />

        {/* Line Items List */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400">Ordered Products & SKUs</p>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {order.products.map((p) => (
              <div key={p.id} className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{p.name}</p>
                  <p className="text-slate-400 text-[10px]">Qty: {p.quantity}</p>
                </div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  ${(p.price * p.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary Breakdown */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>${order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tax (8%)</span>
            <span>${order.tax.toLocaleString()}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-500">
              <span>Discount</span>
              <span>-${order.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-indigo-500" /> {order.paymentMethod}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              ${order.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
