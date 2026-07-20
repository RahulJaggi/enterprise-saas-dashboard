import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
      <p className="text-xs text-slate-400 mb-6">Receive password recovery link for your enterprise account</p>

      {submitted ? (
        <div className="text-center py-4 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <p className="text-sm text-slate-200">Reset instructions sent to {email}</p>
          <Link to="/login" className="inline-block text-xs text-indigo-400 hover:underline pt-2">
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Button type="submit" isLoading={loading} className="w-full">
            Send Recovery Link
          </Button>

          <div className="pt-2 text-center">
            <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
