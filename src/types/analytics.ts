export interface RevenueMetric {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface TrafficSource {
  source: string;
  users: number;
  conversionRate: number;
  color: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  activeSubscriptions: number;
  subscriptionsGrowth: number;
  activeUsers: number;
  usersGrowth: number;
  churnRate: number;
  churnGrowth: number;
}
