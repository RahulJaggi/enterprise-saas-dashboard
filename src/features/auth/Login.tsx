import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, KeyRound } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginSuccess } from '../../app/authSlice';
import { MOCK_ACCOUNTS, createMockJwtToken } from './mock/auth.mock';
import { toast } from '../../components/ui/Toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'superadmin@enterprise.io',
      password: 'SuperAdmin@123',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    await new Promise((res) => setTimeout(res, 400));

    const account = MOCK_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === data.email.toLowerCase() && acc.password === data.password
    );

    if (!account) {
      setAuthError('Invalid credentials. Please select one of the mock accounts below.');
      toast.error('Authentication failed: Invalid credentials');
      return;
    }

    const token = createMockJwtToken(account);

    dispatch(
      loginSuccess({
        user: {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role as any,
          avatarUrl: account.avatarUrl,
          department: account.department,
          permissions: {
            users: {
              view: account.role === 'Super Admin' || account.role === 'Admin' || account.role === 'Manager',
              create: account.role === 'Super Admin' || account.role === 'Admin',
              edit: account.role === 'Super Admin' || account.role === 'Admin',
              delete: account.role === 'Super Admin' || account.role === 'Admin',
            },
            products: {
              view: true,
              create: account.role !== 'User',
              edit: account.role !== 'User',
              delete: account.role === 'Super Admin' || account.role === 'Admin',
            },
            orders: {
              view: true,
              create: account.role !== 'User',
              edit: account.role !== 'User',
              delete: account.role === 'Super Admin' || account.role === 'Admin',
            },
            analytics: { view: true, export: true },
            reports: { view: true, create: true, export: account.role !== 'User' },
            settings: {
              view: account.role === 'Super Admin' || account.role === 'Admin',
              edit: account.role === 'Super Admin' || account.role === 'Admin',
            },
            auditLogs: { view: account.role === 'Super Admin' || account.role === 'Admin' },
          },
        },
        token,
      })
    );

    toast.success(`Welcome back, ${account.name} (${account.role})`);
    navigate('/dashboard');
  };

  const fillAccount = (email: string, pass: string) => {
    setValue('email', email);
    setValue('password', pass);
    setAuthError(null);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-1">Enterprise Credential Sign In</h3>
      <p className="text-xs text-slate-400 mb-4">Enter valid credentials to decode role JWT token</p>

      {authError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center text-slate-400 gap-2 cursor-pointer">
            <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-indigo-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Authenticate Credentials
        </Button>
      </form>

      {/* Mock Accounts Helper Table */}
      <div className="mt-6 pt-4 border-t border-slate-800 text-xs">
        <p className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-2">
          <KeyRound className="w-3.5 h-3.5 text-indigo-400" /> Click to autofill test credentials:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {MOCK_ACCOUNTS.map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => fillAccount(acc.email, acc.password)}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-left hover:border-indigo-500 transition-colors"
            >
              <p className="font-bold text-indigo-300 text-[11px]">{acc.role}</p>
              <p className="text-[10px] text-slate-400 truncate">{acc.email}</p>
              <p className="text-[9px] text-slate-500 font-mono">{acc.password}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
