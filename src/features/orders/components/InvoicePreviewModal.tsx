import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Printer, Download, Building2 } from 'lucide-react';
import { Order } from '../types/order.types';
import { toast } from '../../../components/ui/Toast';

interface InvoicePreviewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    toast.success(`Printing invoice for ${order.orderNumber}...`);
  };

  const handleDownload = () => {
    toast.success(`Downloading PDF invoice ${order.orderNumber}.pdf`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Invoice ${order.orderNumber}`} maxWidth="lg">
      <div className="space-y-6 text-xs p-2">
        {/* Invoice Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Enterprise SaaS Inc.</h4>
              <p className="text-[11px] text-slate-400">100 Tech Boulevard, San Francisco, CA</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono font-bold text-slate-900 dark:text-slate-100">{order.orderNumber}</p>
            <p className="text-slate-400 text-[11px]">Date: {order.createdAt}</p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Billed To</p>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{order.customer.name}</p>
            <p className="text-slate-500">{order.customer.email}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Payment Information</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{order.paymentMethod}</p>
            <p className="text-emerald-500 font-bold">{order.paymentStatus}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.products.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                  <td className="p-3 text-center">{p.quantity}</td>
                  <td className="p-3 text-right">${p.price.toLocaleString()}</td>
                  <td className="p-3 text-right font-semibold">
                    ${(p.price * p.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-1.5 text-right font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal:</span>
              <span>${order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tax (8%):</span>
              <span>${order.tax.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-500">
                <span>Discount:</span>
                <span>-${order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Total Paid:</span>
              <span>${order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" size="sm" leftIcon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
            Print
          </Button>
          <Button size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};
