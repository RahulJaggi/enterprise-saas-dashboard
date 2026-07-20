import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">403 Forbidden</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Access Restricted. Your account role does not have permission to view this resource.
          </p>
        </div>

        <div className="pt-2">
          <Button
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Back to Executive Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
