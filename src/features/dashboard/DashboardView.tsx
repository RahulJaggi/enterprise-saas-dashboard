import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { DollarSign, Users, TrendingUp, UserMinus, Plus, FileDown, Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  useGetDashboardMetricsQuery,
  useGetRevenueMetricsQuery,
  useGetOrdersQuery,
} from '../../services/baseApi';
import { useNavigate } from 'react-router-dom';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { data: metrics, isLoading: metricsLoading } = useGetDashboardMetricsQuery();
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueMetricsQuery();
  const { data: orders, isLoading: ordersLoading } = useGetOrdersQuery();

  if (metricsLoading || revenueLoading || ordersLoading) {
    return <LoadingState label="Loading executive dashboard..." />;
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
          value={`$${metrics?.totalRevenue.toLocaleString()}`}
          change={metrics?.revenueGrowth || 0}
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          title="Active Subscriptions"
          value={metrics?.activeSubscriptions.toLocaleString() || '0'}
          change={metrics?.subscriptionsGrowth || 0}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBgColor="bg-indigo-500/10 text-indigo-500"
        />
        <StatCard
          title="Active Daily Users"
          value={metrics?.activeUsers.toLocaleString() || '0'}
          change={metrics?.usersGrowth || 0}
          icon={<Users className="w-5 h-5" />}
          iconBgColor="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          title="Monthly Churn Rate"
          value={`${metrics?.churnRate}%`}
          change={metrics?.churnGrowth || 0}
          icon={<UserMinus className="w-5 h-5" />}
          iconBgColor="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glass className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue & Net Profit Trend</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Monthly revenue breakdown in USD</p>
            </div>
            <Badge variant="info">Live Stream</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders List */}
        <Card glass>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Activity className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800/60">
            {orders?.slice(0, 4).map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{order.customerName}</p>
                  <p className="text-[10px] text-slate-400">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">${order.amount.toLocaleString()}</p>
                  <Badge variant={order.status === 'Completed' ? 'success' : 'warning'} size="sm">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
