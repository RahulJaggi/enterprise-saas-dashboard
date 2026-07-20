export interface ReportSummaryMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  averageOrderValue: number;
  aovGrowth: number;
  customerConversionRate: number;
  conversionGrowth: number;
}

export interface MonthlySalesMetric {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface OrderStatusAnalytics {
  status: string;
  count: number;
  percentage: number;
}

export interface TopProductAnalytics {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitsSold: number;
  revenueGenerated: number;
}

export interface TopCustomerAnalytics {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalOrders: number;
  totalSpent: number;
}

export interface ReportsAnalyticsData {
  summary: ReportSummaryMetrics;
  monthlySales: MonthlySalesMetric[];
  ordersByStatus: OrderStatusAnalytics[];
  topProducts: TopProductAnalytics[];
  topCustomers: TopCustomerAnalytics[];
}
