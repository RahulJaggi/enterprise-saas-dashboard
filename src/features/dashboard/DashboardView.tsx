import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/feedback/EmptyState';
import { RevenueChart } from './components/RevenueChart';
import { QuickActionsSection } from './components/QuickActionsSection';
import { RecentOrdersTable } from './components/RecentOrdersTable';
import { RecentActivityTimeline } from './components/RecentActivityTimeline';
import { DollarSign, Users, TrendingUp, UserMinus, Plus, FileDown } from 'lucide-react';
import {
  useGetDashboardMetricsQuery,
  useGetRevenueMetricsQuery,
  useGetOrdersQuery,
  useGetAuditLogsQuery,
} from '../../services/baseApi';
import { useNavigate } from 'react-router-dom';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { data: metrics, isLoading: metricsLoading } = useGetDashboardMetricsQuery();
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueMetricsQuery();
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();
  const { data: auditLogs, isLoading: logsLoading } = useGetAuditLogsQuery();

  const isLoading = metricsLoading || revenueLoading || ordersLoading || logsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <EmptyState title="Metrics unavailable" description="Could not load executive dashboard metrics." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Overview"
        description="Real-time performance metrics and SaaS business health indicators"
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileDown className="w-4 h-4" />}
              onClick={() => navigate('/reports')}
            >
              Export
            </Button>
            <Button
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/users')}
            >
              Add User
            </Button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total MRR / Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          change={metrics.revenueGrowth}
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions.toLocaleString()}
          change={metrics.subscriptionsGrowth}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBgColor="bg-indigo-500/10 text-indigo-500"
        />
        <StatCard
          title="Active Daily Users"
          value={metrics.activeUsers.toLocaleString()}
          change={metrics.usersGrowth}
          icon={<Users className="w-5 h-5" />}
          iconBgColor="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Monthly Churn Rate"
          value={`${metrics.churnRate}%`}
          change={metrics.churnGrowth}
          icon={<UserMinus className="w-5 h-5" />}
          iconBgColor="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Quick Actions Section */}
      <QuickActionsSection />

      {/* Charts & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={revenueData} />
        <RecentOrdersTable orders={orders} />
      </div>

      {/* Activity Timeline */}
      <RecentActivityTimeline logs={auditLogs} />
    </div>
  );
};
