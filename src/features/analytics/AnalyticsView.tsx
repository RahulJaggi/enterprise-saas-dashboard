import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetRevenueMetricsQuery, useGetTrafficSourcesQuery } from '../../services/baseApi';

export const AnalyticsView: React.FC = () => {
  const { data: revenue, isLoading: revLoading } = useGetRevenueMetricsQuery();
  const { data: traffic, isLoading: trafficLoading } = useGetTrafficSourcesQuery();

  if (revLoading || trafficLoading) {
    return <LoadingState label="Analyzing enterprise metrics..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Intelligence"
        description="Deep operational insights into acquisition channels and fiscal performance"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses vs Profit Bar Chart */}
        <Card glass>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Operating Expenses vs Profit</CardTitle>
            <Badge variant="neutral">Financials</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card glass>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Acquisition Traffic Breakdown</CardTitle>
            <Badge variant="info">Channels</Badge>
          </CardHeader>
          <CardContent className="h-72 flex flex-col md:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={traffic}
                  dataKey="users"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={5}
                >
                  {traffic?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full md:w-48 space-y-2 mt-4 md:mt-0">
              {traffic?.map((t) => (
                <div key={t.source} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }}></span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{t.source}</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t.users}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
