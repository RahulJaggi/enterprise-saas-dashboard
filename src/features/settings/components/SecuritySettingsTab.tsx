import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Switch } from '../../../components/ui/Switch';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ActiveSession } from '../types/settings.types';
import { toast } from '../../../components/ui/Toast';
import { Shield, Key, Laptop, Trash2, LogOut } from 'lucide-react';

interface SecuritySettingsTabProps {
  twoFactorEnabled?: boolean;
  activeSessions?: ActiveSession[];
  onTerminateSession: (id: string) => Promise<void>;
}

export const SecuritySettingsTab: React.FC<SecuritySettingsTabProps> = ({
  twoFactorEnabled = true,
  activeSessions = [],
  onTerminateSession,
}) => {
  const [is2FA, setIs2FA] = useState(twoFactorEnabled);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass || newPass !== confirmPass) {
      toast.error('Passwords do not match or fields missing.');
      return;
    }
    toast.success('Password updated successfully');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleLogoutAll = () => {
    toast.success('Logged out from all other active device sessions');
  };

  return (
    <div className="space-y-6">
      {/* Change Password Card */}
      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-500" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <Input
              type="password"
              label="Current Password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••••••"
            />
            <Input
              type="password"
              label="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••••••"
            />
            <Input
              type="password"
              label="Confirm New Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••••••"
            />
            <Button type="submit" size="sm">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" /> Two-Factor Authentication (2FA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch
            label="Enable Two-Factor Authentication"
            description="Require an authenticator app TOTP verification code during login"
            checked={is2FA}
            onChange={(e) => {
              setIs2FA(e.target.checked);
              toast.success(`2FA is now ${e.target.checked ? 'Enabled' : 'Disabled'}`);
            }}
          />
        </CardContent>
      </Card>

      {/* Active Sessions Card */}
      <Card glass>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-indigo-500" /> Active Device Sessions
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<LogOut className="w-3.5 h-3.5 text-red-500" />}
            onClick={handleLogoutAll}
          >
            Logout All Devices
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">{session.device}</h5>
                  {session.current && <Badge variant="success" size="sm">Current Device</Badge>}
                </div>
                <p className="text-slate-500 mt-0.5">
                  {session.browser} • {session.ipAddress} ({session.location})
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Last Active: {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await onTerminateSession(session.id);
                    toast.success('Session terminated');
                  }}
                  title="Revoke session"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
