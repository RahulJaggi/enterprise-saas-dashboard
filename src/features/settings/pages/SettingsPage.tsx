import { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { ProfileSettingsTab } from '../components/ProfileSettingsTab';
import { SecuritySettingsTab } from '../components/SecuritySettingsTab';
import { AppearanceSettingsTab } from '../components/AppearanceSettingsTab';
import { NotificationsSettingsTab } from '../components/NotificationsSettingsTab';
import { PreferencesSettingsTab } from '../components/PreferencesSettingsTab';
import { AboutSettingsTab } from '../components/AboutSettingsTab';
import { useSettings } from '../hooks/useSettings';
import { User, Shield, Palette, Bell, Sliders, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

type SettingsTabKey = 'profile' | 'security' | 'appearance' | 'notifications' | 'preferences' | 'about';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>('profile');
  const { settings, activeSessions, updateSettings, terminateSession } = useSettings();

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'security', label: 'Security & 2FA', icon: Shield },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'preferences', label: 'Preferences', icon: Sliders },
    { key: 'about', label: 'About App', icon: Info },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="System & Account Settings"
        description="Manage user profile details, security settings, themes, notification channels, and global preferences"
      />

      {/* Tab Navigation Menu */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800 pb-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as SettingsTabKey)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="mt-4">
        {activeTab === 'profile' && (
          <ProfileSettingsTab
            initialValues={settings?.profile}
            onSave={async (profileData) => {
              await updateSettings({ profile: profileData as any });
            }}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySettingsTab
            twoFactorEnabled={settings?.security?.twoFactorEnabled}
            activeSessions={activeSessions}
            onTerminateSession={async (id) => {
              await terminateSession(id);
            }}
          />
        )}

        {activeTab === 'appearance' && <AppearanceSettingsTab />}

        {activeTab === 'notifications' && (
          <NotificationsSettingsTab
            initialValues={settings?.notifications}
            onSave={async (notifData) => {
              await updateSettings({ notifications: notifData as any });
            }}
          />
        )}

        {activeTab === 'preferences' && (
          <PreferencesSettingsTab
            initialValues={settings?.preferences}
            onSave={async (prefData) => {
              await updateSettings({ preferences: prefData as any });
            }}
          />
        )}

        {activeTab === 'about' && <AboutSettingsTab />}
      </div>
    </div>
  );
}

export default SettingsPage;
