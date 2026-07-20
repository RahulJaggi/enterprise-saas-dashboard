import { UserRole } from '../../../config/permissions';

export interface MockUserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatarUrl: string;
  department: string;
}

export const MOCK_ACCOUNTS: MockUserAccount[] = [
  {
    id: 'usr-super-1',
    name: 'Rahul Jaggi (Super Admin)',
    email: 'superadmin@enterprise.io',
    password: 'SuperAdmin@123',
    role: 'Super Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    department: 'Executive Leadership',
  },
  {
    id: 'usr-admin-2',
    name: 'Sarah Connor (Admin)',
    email: 'admin@enterprise.io',
    password: 'Admin@123',
    role: 'Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    department: 'Engineering',
  },
  {
    id: 'usr-mgr-3',
    name: 'Marcus Vance (Manager)',
    email: 'manager@enterprise.io',
    password: 'Manager@123',
    role: 'Manager',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    department: 'Product Strategy',
  },
  {
    id: 'usr-user-4',
    name: 'David Kim (User)',
    email: 'user@enterprise.io',
    password: 'User@123',
    role: 'User',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    department: 'Data Analytics',
  },
];

export function createMockJwtToken(account: MockUserAccount): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    })
  );
  const signature = 'mock-hmac-sha256-signature';
  return `${header}.${payload}.${signature}`;
}

export function decodeMockJwtToken(token: string): { role?: UserRole; email?: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}
