import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginSuccess } from '../../app/authSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    // Simulate authentication delay
    await new Promise((res) => setTimeout(res, 600));
    dispatch(
      loginSuccess({
        user: {
          id: 'usr-1',
          name: 'Rahul Jaggi',
          email: data.email,
          role: 'Super Admin',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          department: 'Executive Leadership',
          permissions: {
            users: { view: true, create: true, edit: true, delete: true },
            products: { view: true, create: true, edit: true, delete: true },
            orders: { view: true, create: true, edit: true, delete: true },
            analytics: { view: true, export: true },
            reports: { view: true, create: true, export: true },
            settings: { view: true, edit: true },
            auditLogs: { view: true },
          },
        },
        token: 'mock-jwt-token-production-991',
      })
    );
    navigate('/dashboard');
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">Sign in to Enterprise SaaS</h3>
      <p className="text-xs text-slate-400 mb-6">Enter your organizational credentials to continue</p>

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
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Don't have an enterprise account?{' '}
        <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
          Request Access
        </Link>
      </p>
    </div>
  );
};
