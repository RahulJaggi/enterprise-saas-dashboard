export type UserRole = 'Super Admin' | 'Admin' | 'Manager' | 'Analyst' | 'Support';

export type UserStatus = 'Active' | 'Inactive' | 'Suspended' | 'Pending';

export interface User {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  createdAt: string;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt'>;

export type UpdateUserInput = Partial<CreateUserInput> & { id: string };
