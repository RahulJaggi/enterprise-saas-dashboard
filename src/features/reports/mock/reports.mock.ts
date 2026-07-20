import { ReportsAnalyticsData } from '../types/report.types';

export const mockReportsAnalytics: ReportsAnalyticsData = {
  summary: {
    totalRevenue: 1845900,
    revenueGrowth: 18.4,
    totalOrders: 14250,
    ordersGrowth: 12.1,
    averageOrderValue: 345,
    aovGrowth: 5.6,
    customerConversionRate: 4.8,
    conversionGrowth: 1.2,
  },
  monthlySales: [
    { month: 'Jan', revenue: 120000, expenses: 45000, profit: 75000 },
    { month: 'Feb', revenue: 135000, expenses: 48000, profit: 87000 },
    { month: 'Mar', revenue: 142000, expenses: 50000, profit: 92000 },
    { month: 'Apr', revenue: 158000, expenses: 52000, profit: 106000 },
    { month: 'May', revenue: 165000, expenses: 55000, profit: 110000 },
    { month: 'Jun', revenue: 180000, expenses: 60000, profit: 120000 },
    { month: 'Jul', revenue: 175000, expenses: 58000, profit: 117000 },
    { month: 'Aug', revenue: 190000, expenses: 62000, profit: 128000 },
    { month: 'Sep', revenue: 205000, expenses: 65000, profit: 140000 },
    { month: 'Oct', revenue: 215000, expenses: 68000, profit: 147000 },
    { month: 'Nov', revenue: 230000, expenses: 72000, profit: 158000 },
    { month: 'Dec', revenue: 248950, expenses: 78000, profit: 170950 },
  ],
  ordersByStatus: [
    { status: 'Completed', count: 10240, percentage: 71.8 },
    { status: 'Shipped', count: 2450, percentage: 17.2 },
    { status: 'Processing', count: 1120, percentage: 7.9 },
    { status: 'Cancelled', count: 440, percentage: 3.1 },
  ],
  topProducts: [
    { id: 'p-1', sku: 'SKU-CLD-100', name: 'Enterprise Cloud Cluster Core', category: 'Cloud Infrastructure', unitsSold: 1450, revenueGenerated: 3623550 },
    { id: 'p-2', sku: 'SKU-SEC-300', name: 'Zero-Trust Shield Gateway', category: 'Security Suite', unitsSold: 980, revenueGenerated: 3429020 },
    { id: 'p-3', sku: 'SKU-AI-500', name: 'Nebula AI Analytics Engine', category: 'AI & Analytics', unitsSold: 1200, revenueGenerated: 1558800 },
    { id: 'p-4', sku: 'SKU-SOFT-050', name: 'DevOps Automated Pipeline Suite', category: 'Software License', unitsSold: 850, revenueGenerated: 1359150 },
    { id: 'p-5', sku: 'SKU-API-200', name: 'High-Throughput API Mesh', category: 'API Resource', unitsSold: 1100, revenueGenerated: 988900 },
  ],
  topCustomers: [
    { id: 'c-1', name: 'Rahul Jaggi', email: 'rahul.jaggi@enterprise.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', totalOrders: 42, totalSpent: 104958 },
    { id: 'c-2', name: 'Sarah Connor', email: 'sarah.connor@enterprise.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', totalOrders: 38, totalSpent: 94810 },
    { id: 'c-3', name: 'Marcus Vance', email: 'marcus.vance@enterprise.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', totalOrders: 31, totalSpent: 82450 },
    { id: 'c-4', name: 'Elena Rostova', email: 'elena.rostova@enterprise.io', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', totalOrders: 28, totalSpent: 71200 },
    { id: 'c-5', name: 'Alexander Wright', email: 'alex.wright@enterprise.io', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', totalOrders: 25, totalSpent: 64900 },
  ],
};
