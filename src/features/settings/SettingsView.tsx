import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Key, Webhook, CreditCard, Copy, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [apiKey, setApiKey] = useState('sk_live_enterprise_9904128571029481');
  const [copied, setCopied] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewKey = () => {
    setApiKey(`sk_live_enterprise_${Math.random().toString(36).substring(2, 18)}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Configure API access, webhooks, billing subscriptions, and global options"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Credentials */}
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-500" /> Enterprise API Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Production Secret Key"
              value={apiKey}
              readOnly
              rightIcon={
                <button onClick={handleCopyKey} className="hover:text-indigo-400">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              }
            />
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">Last rotated 14 days ago</span>
              <Button size="sm" variant="outline" onClick={generateNewKey}>
                Rotate Secret Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-indigo-500" /> Webhook Integration Endpoint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Payload Delivery URL" defaultValue="https://api.enterprise.io/webhooks/v1/events" />
            <Select
              label="Events Stream"
              options={[
                { label: 'All System Events (Orders, Users, Security)', value: 'all' },
                { label: 'Orders & Billing Only', value: 'billing' },
                { label: 'Security & Audit Logs Only', value: 'security' },
              ]}
            />
          </CardContent>
        </Card>

        {/* Billing & Subscription */}
        <Card glass className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-500" /> Plan & Invoicing Tiers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Enterprise Dedicated Cluster Plan</p>
              <p className="text-xs text-slate-400">Includes 99.99% SLA, unlimited API calls, and custom SOC2 audit compliance.</p>
            </div>
            <Button size="sm">Manage Billing Portal</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
