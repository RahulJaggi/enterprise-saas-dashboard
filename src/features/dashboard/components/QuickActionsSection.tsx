import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Plus, FileDown, Key, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const QuickActionsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card glass>
      <CardHeader>
        <CardTitle>Quick Administrative Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/users')}
          className="w-full justify-start"
        >
          Add User
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<FileDown className="w-4 h-4" />}
          onClick={() => navigate('/reports')}
          className="w-full justify-start"
        >
          Export Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Key className="w-4 h-4" />}
          onClick={() => {
            toast.success('API Key generated successfully');
            navigate('/settings');
          }}
          className="w-full justify-start"
        >
          Rotate API Keys
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<History className="w-4 h-4" />}
          onClick={() => navigate('/audit-logs')}
          className="w-full justify-start"
        >
          View Audit Logs
        </Button>
      </CardContent>
    </Card>
  );
};
