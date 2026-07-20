import { ApplicationSettings, ActiveSession } from '../types/settings.types';

export const mockDefaultSettings: ApplicationSettings = {
  profile: {
    fullName: 'Rahul Jaggi',
    email: 'rahul.jaggi@enterprise.io',
    phone: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    timezone: '(UTC+05:30) India Standard Time (IST)',
    language: 'English (US)',
  },
  security: {
    twoFactorEnabled: true,
  },
  appearance: {
    theme: 'dark',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
  },
  preferences: {
    defaultDashboard: 'Executive Overview',
    tablePageSize: 10,
    dateFormat: 'YYYY-MM-DD',
    currency: 'USD ($)',
  },
};

export const mockActiveSessions: ActiveSession[] = [
  {
    id: 'sess-1',
    device: 'MacBook Pro 16"',
    browser: 'Chrome 126.0 (macOS)',
    ipAddress: '192.168.1.45',
    location: 'San Francisco, CA, USA',
    lastActive: 'Active now',
    current: true,
  },
  {
    id: 'sess-2',
    device: 'iPhone 15 Pro Max',
    browser: 'Safari Mobile 17.4 (iOS)',
    ipAddress: '172.56.21.90',
    location: 'San Francisco, CA, USA',
    lastActive: '2 hours ago',
    current: false,
  },
  {
    id: 'sess-3',
    device: 'Dell XPS 15 Workstation',
    browser: 'Firefox 125.0 (Windows 11)',
    ipAddress: '198.51.100.22',
    location: 'Austin, TX, USA',
    lastActive: 'Yesterday at 18:30',
    current: false,
  },
];
