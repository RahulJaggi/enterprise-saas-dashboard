export interface AuditLog {
  id: string;
  user: string;
  email: string;
  action: string;
  category: 'Security' | 'User Management' | 'Billing' | 'System' | 'Data';
  ipAddress: string;
  status: 'Success' | 'Failure' | 'Warning';
  timestamp: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
}
