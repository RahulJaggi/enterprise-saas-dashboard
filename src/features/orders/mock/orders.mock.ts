import { Order } from '../types/order.types';

const customersList = [
  { id: 'c-101', name: 'Rahul Jaggi', email: 'rahul.jaggi@enterprise.io', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'c-102', name: 'Sarah Connor', email: 'sarah.connor@enterprise.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'c-103', name: 'Marcus Vance', email: 'marcus.vance@enterprise.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'c-104', name: 'Elena Rostova', email: 'elena.rostova@enterprise.io', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 'c-105', name: 'David Kim', email: 'david.kim@enterprise.io', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'c-106', name: 'Chloe Bennett', email: 'chloe.bennett@enterprise.io', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' },
];

const sampleProducts = [
  { id: 'p-1', name: 'Enterprise Cloud Cluster Core', price: 2499 },
  { id: 'p-2', name: 'Nebula AI Analytics Engine', price: 1299 },
  { id: 'p-3', name: 'Zero-Trust Shield Gateway', price: 3499 },
  { id: 'p-4', name: 'High-Throughput API Mesh', price: 899 },
  { id: 'p-5', name: 'DevOps Automated Pipeline Suite', price: 1599 },
];

export const mockOrders: Order[] = Array.from({ length: 100 }).map((_, idx) => {
  const orderNum = 8801 + idx;
  const customer = customersList[idx % customersList.length];
  const prod1 = sampleProducts[idx % sampleProducts.length];
  const prod2 = sampleProducts[(idx + 2) % sampleProducts.length];
  const products = [
    { id: prod1.id, name: prod1.name, quantity: (idx % 3) + 1, price: prod1.price },
    { id: prod2.id, name: prod2.name, quantity: 1, price: prod2.price },
  ];
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const discount = idx % 4 === 0 ? 250 : 0;
  const total = subtotal + tax - discount;

  const paymentStatuses: Order['paymentStatus'][] = ['Paid', 'Paid', 'Pending', 'Refunded', 'Failed'];
  const orderStatuses: Order['orderStatus'][] = ['Completed', 'Shipped', 'Processing', 'Cancelled'];
  const paymentMethods: Order['paymentMethod'][] = ['Credit Card', 'Wire Transfer', 'ACH Direct', 'PayPal'];

  return {
    id: `ord-${orderNum}`,
    orderNumber: `ORD-2024-${orderNum}`,
    customer,
    products,
    subtotal,
    tax,
    discount,
    total,
    paymentMethod: paymentMethods[idx % paymentMethods.length],
    paymentStatus: paymentStatuses[idx % paymentStatuses.length],
    orderStatus: orderStatuses[idx % orderStatuses.length],
    shippingAddress: `${100 + idx} Enterprise Tech Way, Suite ${200 + idx}, San Francisco, CA 94105`,
    createdAt: `2024-${String((idx % 12) + 1).padStart(2, '0')}-${String((idx % 28) + 1).padStart(2, '0')}`,
  };
});
