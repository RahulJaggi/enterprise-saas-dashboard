import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateUserProfile } from '../../app/authSlice';
import { User, Shield, Key, Save } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, department }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Profile & Credentials"
        description="Manage personal credentials, security keys, and active sessions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Card */}
        <Card glass className="p-6 text-center space-y-4">
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-600/20 shadow-xl"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{user?.name}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <div className="pt-2 flex justify-center gap-2">
            <Badge variant="info">
              <Shield className="w-3 h-3 mr-1" />
              {user?.role}
            </Badge>
          </div>
        </Card>

        {/* Profile Details Form */}
        <Card glass className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" /> Account Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email Address" value={user?.email || ''} disabled helperText="Email address is tied to OAuth single sign-on." />
              <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />

              <div className="pt-4 flex items-center justify-between">
                {saved && <span className="text-xs text-emerald-500 font-semibold">Profile saved successfully!</span>}
                <Button type="submit" leftIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Security Credentials Card */}
      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-500" /> Multi-Factor Authentication (MFA)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Hardware Security Key / TOTP</p>
            <p className="text-xs text-slate-400 mt-0.5">Enforce TOTP authenticator app verification on login.</p>
          </div>
          <Badge variant="success">Enabled</Badge>
        </CardContent>
      </Card>
    </div>
  );
};
