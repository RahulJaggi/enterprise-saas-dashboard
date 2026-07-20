import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">401 Unauthorized</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Authentication Required. Please sign in with valid enterprise credentials to view this area.
          </p>
        </div>

        <div className="pt-2">
          <Button
            leftIcon={<LogIn className="w-4 h-4" />}
            onClick={() => navigate('/login')}
          >
            Sign In to Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
