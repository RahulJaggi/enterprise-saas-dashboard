import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Shield, UserCheck, User as UserIcon } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginSuccess } from '../../app/authSlice';
import { UserRole } from '../../config/permissions';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'rahul.jaggi@enterprise.io',
      password: 'password123',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((res) => setTimeout(res, 400));
    dispatch(
      loginSuccess({
        user: {
          id: 'usr-1',
          name: 'Rahul Jaggi',
          email: data.email,
          role: selectedRole as any,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          department: 'Executive Leadership',
          permissions: {
            users: { view: selectedRole === 'Admin', create: selectedRole === 'Admin', edit: selectedRole === 'Admin', delete: selectedRole === 'Admin' },
            products: { view: true, create: selectedRole !== 'User', edit: selectedRole !== 'User', delete: selectedRole === 'Admin' },
            orders: { view: true, create: selectedRole !== 'User', edit: selectedRole !== 'User', delete: selectedRole === 'Admin' },
            analytics: { view: true, export: true },
            reports: { view: true, create: true, export: selectedRole !== 'User' },
            settings: { view: selectedRole === 'Admin', edit: selectedRole === 'Admin' },
            auditLogs: { view: selectedRole === 'Admin' },
          },
        },
        token: `mock-jwt-${selectedRole.toLowerCase()}-token`,
      })
    );
    navigate('/dashboard');
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">Sign in to Enterprise SaaS</h3>
      <p className="text-xs text-slate-400 mb-4">Select your test role and login</p>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { role: 'Admin' as UserRole, icon: Shield, color: 'text-indigo-400' },
          { role: 'Manager' as UserRole, icon: UserCheck, color: 'text-emerald-400' },
          { role: 'User' as UserRole, icon: UserIcon, color: 'text-blue-400' },
        ].map(({ role, icon: Icon, color }) => {
          const isSelected = selectedRole === role;
          return (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-600/20 text-white'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{role}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
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
          Sign In as {selectedRole}
        </Button>
      </form>
    </div>
  );
};
