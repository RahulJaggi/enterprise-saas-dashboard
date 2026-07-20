import { PageHeader } from '../../../components/layout/PageHeader';
import { StatCard } from '../../../components/common/StatCard';
import { ReportExportButtons } from '../components/ReportExportButtons';
import { RevenueTrendChart } from '../components/RevenueTrendChart';
import { OrdersAnalyticsChart } from '../components/OrdersAnalyticsChart';
import { TopProductsTable } from '../components/TopProductsTable';
import { TopCustomersTable } from '../components/TopCustomersTable';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useReports } from '../hooks/useReports';
import { DollarSign, ShoppingBag, TrendingUp, Percent } from 'lucide-react';

export function ReportsPage() {
  const { analytics, isLoading } = useReports();

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-80" />
      </div>
    );
  }

  const { summary } = analytics;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Executive Analytics"
        description="Comprehensive SaaS revenue insights, monthly trends, order volumes, and top-tier product performance"
        action={<ReportExportButtons analytics={analytics} />}
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Gross Revenue"
          value={`$${summary.totalRevenue.toLocaleString()}`}
          change={summary.revenueGrowth}
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Total Orders Processed"
          value={summary.totalOrders.toLocaleString()}
          change={summary.ordersGrowth}
          icon={<ShoppingBag className="w-5 h-5" />}
          iconBgColor="bg-indigo-500/10 text-indigo-500"
        />
        <StatCard
          title="Average Order Value (AOV)"
          value={`$${summary.averageOrderValue}`}
          change={summary.aovGrowth}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBgColor="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Conversion Rate"
          value={`${summary.customerConversionRate}%`}
          change={summary.conversionGrowth}
          icon={<Percent className="w-5 h-5" />}
          iconBgColor="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Revenue Trend Chart */}
      <RevenueTrendChart data={analytics.monthlySales} />

      {/* Orders Analytics Charts */}
      <OrdersAnalyticsChart data={analytics.ordersByStatus} />

      {/* Top Performing Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsTable products={analytics.topProducts} />
        <TopCustomersTable customers={analytics.topCustomers} />
      </div>
    </div>
  );
}

export default ReportsPage;
