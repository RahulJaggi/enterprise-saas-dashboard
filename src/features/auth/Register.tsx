import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  organization: z.string().min(2, 'Organization name required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 600));
    navigate('/login');
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">Request Enterprise Account</h3>
      <p className="text-xs text-slate-400 mb-6">Create a new workspace for your engineering team</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="Organization Name"
          leftIcon={<Building className="w-4 h-4" />}
          error={errors.organization?.message}
          {...register('organization')}
        />
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

        <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
          Create Enterprise Workspace
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
