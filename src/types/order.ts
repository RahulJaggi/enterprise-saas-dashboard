export type OrderStatus = 'Completed' | 'Processing' | 'Pending' | 'Cancelled' | 'Refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'PayPal' | 'ACH';
  createdAt: string;
}
