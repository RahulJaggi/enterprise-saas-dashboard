import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Switch } from '../../../components/ui/Switch';
import { Button } from '../../../components/ui/Button';
import { NotificationSettings } from '../types/settings.types';
import { toast } from '../../../components/ui/Toast';
import { Bell, Mail, Smartphone, BarChart } from 'lucide-react';

interface NotificationsSettingsTabProps {
  initialValues?: NotificationSettings;
  onSave: (data: Partial<NotificationSettings>) => Promise<void>;
}

export const NotificationsSettingsTab: React.FC<NotificationsSettingsTabProps> = ({
  initialValues,
  onSave,
}) => {
  const [emailNotifs, setEmailNotifs] = useState(initialValues?.emailNotifications ?? true);
  const [pushNotifs, setPushNotifs] = useState(initialValues?.pushNotifications ?? true);
  const [marketingEmails, setMarketingEmails] = useState(initialValues?.marketingEmails ?? false);
  const [weeklyReports, setWeeklyReports] = useState(initialValues?.weeklyReports ?? true);

  const handleSave = async () => {
    try {
      await onSave({
        notifications: {
          emailNotifications: emailNotifs,
          pushNotifications: pushNotifs,
          marketingEmails,
          weeklyReports,
        },
      } as any);
      toast.success('Notification preferences saved');
    } catch {
      toast.error('Failed to save notification preferences');
    }
  };

  return (
    <Card glass>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-500" /> Notification Channels & Digest Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <Mail className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
            <div className="flex-1">
              <Switch
                label="Email Notifications"
                description="Receive system updates, security alerts, and order confirmations via email"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <Smartphone className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
            <div className="flex-1">
              <Switch
                label="Push Notifications"
                description="Receive browser and mobile push alerts for real-time customer actions"
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <Mail className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
            <div className="flex-1">
              <Switch
                label="Product & Marketing Updates"
                description="Receive new feature announcements, webinars, and promotional digests"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <BarChart className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
            <div className="flex-1">
              <Switch
                label="Weekly Analytics Digest"
                description="Receive automated executive summary metrics every Monday morning"
                checked={weeklyReports}
                onChange={(e) => setWeeklyReports(e.target.checked)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave}>Save Notification Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};
