export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type OrderStatus = 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';

export type PaymentMethod = 'Credit Card' | 'Wire Transfer' | 'PayPal' | 'ACH Direct';

export interface OrderProductItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  products: OrderProductItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: string;
  createdAt: string;
}
