export type CustomerStatus = 'Active' | 'Inactive' | 'VIP' | 'Churned';

export interface CustomerOrderHistoryItem {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
}

export interface Customer {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchase: string;
  status: CustomerStatus;
  address: string;
  createdAt: string;
  orderHistory?: CustomerOrderHistoryItem[];
}
