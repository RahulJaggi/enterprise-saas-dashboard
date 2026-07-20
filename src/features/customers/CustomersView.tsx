import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { LoadingState } from '../../components/common/LoadingState';
import { Search, Building, DollarSign, ShoppingBag } from 'lucide-react';
import { useGetCustomersQuery } from '../../services/baseApi';

export const CustomersView: React.FC = () => {
  const { data: customers, isLoading } = useGetCustomersQuery();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <LoadingState label="Loading customer directory..." />;

  const filtered = customers?.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Accounts & Customers"
        description="Accounts directory, tier allocations, and lifetime value tracking"
      />

      <Card glass className="p-4 flex justify-between items-center">
        <div className="w-72">
          <Input
            placeholder="Search company or account..."
            leftIcon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">Active Accounts: {filtered?.length || 0}</span>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map((cust) => (
          <Card key={cust.id} glass className="p-6 space-y-4 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{cust.name}</h4>
                  <p className="text-xs text-slate-400">{cust.email}</p>
                </div>
              </div>
              <Badge variant={cust.plan === 'Enterprise' ? 'info' : 'neutral'} size="sm">
                {cust.plan}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Spent</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">${cust.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Orders</p>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{cust.ordersCount}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
