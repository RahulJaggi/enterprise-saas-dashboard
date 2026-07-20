import { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { OrderTable } from '../components/OrderTable';
import { OrderDrawer } from '../components/OrderDrawer';
import { InvoicePreviewModal } from '../components/InvoicePreviewModal';
import { useOrders } from '../hooks/useOrders';
import { Order } from '../types/order.types';

export function OrdersPage() {
  const { orders, isLoading, isError } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleOpenInvoice = (order: Order) => {
    setInvoiceOrder(order);
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders & Transactions"
        description="Monitor customer orders, fulfillment lifecycles, payment transactions, and printable invoices"
      />

      <OrderTable
        orders={orders}
        isLoading={isLoading}
        isError={isError}
        onViewOrder={handleViewOrder}
        onOpenInvoice={handleOpenInvoice}
      />

      <OrderDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenInvoice={handleOpenInvoice}
      />

      <InvoicePreviewModal
        order={invoiceOrder}
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
    </div>
  );
}

export default OrdersPage;
