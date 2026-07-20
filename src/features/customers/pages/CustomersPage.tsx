import { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { CustomerTable } from '../components/CustomerTable';
import { CustomerDrawer } from '../components/CustomerDrawer';
import { useCustomers } from '../hooks/useCustomers';
import { Customer } from '../types/customer.types';

export function CustomersPage() {
  const { customers, isLoading, isError } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Relationship Management"
        description="Directory of accounts, order volume, lifetime total spending, and customer status badges"
      />

      <CustomerTable
        customers={customers}
        isLoading={isLoading}
        isError={isError}
        onViewCustomer={handleViewCustomer}
      />

      <CustomerDrawer
        customer={selectedCustomer}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default CustomersPage;
