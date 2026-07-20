import { Customer } from '../types/customer.types';

const firstNames = [
  'Rahul', 'Sarah', 'Marcus', 'Elena', 'David', 'Chloe', 'Alexander', 'Sophia',
  'Julian', 'Ethan', 'Isabella', 'Daniel', 'Victoria', 'Lucas', 'Hannah', 'Oliver',
  'Mason', 'Amelia', 'Benjamin', 'Mia', 'Gabriel', 'Charlotte', 'Henry', 'Evelyn',
];

const lastNames = [
  'Jaggi', 'Connor', 'Vance', 'Rostova', 'Kim', 'Bennett', 'Wright', 'Martinez',
  'Hayes', 'Sterling', 'Chen', 'Brooks', 'Thorne', 'Garcia', 'Queen', 'Reed',
  'Watson', 'Cole', 'Taylor', 'Silva', 'King', 'Ford', 'Ross', 'Locke',
];

const avatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
];

const statuses: Customer['status'][] = ['Active', 'VIP', 'Active', 'Inactive', 'Churned'];

export const mockCustomers: Customer[] = Array.from({ length: 100 }).map((_, idx) => {
  const fName = firstNames[idx % firstNames.length];
  const lName = lastNames[(idx * 3) % lastNames.length];
  const fullName = `${fName} ${lName}`;
  const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${idx + 1}@enterprise.io`;
  const ordersCount = Math.floor(1 + (idx * 5) % 45);
  const spent = Math.floor(ordersCount * 1250 + (idx * 340));
  const status = idx % 7 === 0 ? 'VIP' : statuses[idx % statuses.length];

  return {
    id: `cust-${101 + idx}`,
    avatar: avatars[idx % avatars.length],
    fullName,
    email,
    phone: `+1 (555) ${String(100 + idx).padStart(3, '0')}-${String(2000 + idx).padStart(4, '0')}`,
    totalOrders: ordersCount,
    totalSpent: spent,
    lastPurchase: `2024-${String((idx % 12) + 1).padStart(2, '0')}-${String((idx % 28) + 1).padStart(2, '0')}`,
    status,
    address: `${100 + idx} Corporate Tech Parkway, Suite ${500 + idx}, San Jose, CA 95110`,
    createdAt: `2023-${String((idx % 12) + 1).padStart(2, '0')}-01`,
    orderHistory: [
      {
        id: `ord-hist-${idx}-1`,
        orderNumber: `ORD-2024-${8801 + idx}`,
        date: `2024-${String((idx % 12) + 1).padStart(2, '0')}-15`,
        total: Math.floor(spent / ordersCount),
        status: 'Completed',
      },
      {
        id: `ord-hist-${idx}-2`,
        orderNumber: `ORD-2024-${8700 + idx}`,
        date: `2024-01-10`,
        total: 1499,
        status: 'Completed',
      },
    ],
  };
});
