export interface ProfileSettings {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  timezone: string;
  language: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
}

export interface PreferenceSettings {
  defaultDashboard: string;
  tablePageSize: number;
  dateFormat: string;
  currency: string;
}

export interface ApplicationSettings {
  profile: ProfileSettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  preferences: PreferenceSettings;
}
