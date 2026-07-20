import { Role, Status } from './common';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  department: string;
  avatarUrl: string;
  lastLogin: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: Status;
  totalSpent: number;
  ordersCount: number;
  createdAt: string;
}
