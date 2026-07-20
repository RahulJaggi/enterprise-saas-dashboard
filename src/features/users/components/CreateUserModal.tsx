import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../../components/ui/Modal';
import { Form } from '../../../components/forms/Form';
import { FormInput } from '../../../components/forms/FormInput';
import { FormSelect } from '../../../components/forms/FormSelect';
import { FormSubmitButton } from '../../../components/forms/FormSubmitButton';
import { Button } from '../../../components/ui/Button';
import { USER_ROLES, USER_DEPARTMENTS, USER_STATUSES } from '../constants/user.constants';
import { CreateUserInput } from '../types/user.types';
import { toast } from '../../../components/ui/Toast';

const createUserSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number required'),
  role: z.enum(USER_ROLES),
  department: z.string().min(2, 'Department required'),
  status: z.enum(USER_STATUSES),
  avatar: z.string().url('Invalid avatar URL'),
});

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUser: (data: CreateUserInput) => Promise<void>;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSubmitUser,
}) => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: 'Admin',
      department: 'Engineering',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  const handleSubmit = async (data: CreateUserInput) => {
    try {
      await onSubmitUser(data);
      toast.success('User created successfully');
      form.reset();
      onClose();
    } catch {
      toast.error('Failed to create user');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Enterprise User" maxWidth="lg">
      <Form form={form} onSubmit={handleSubmit} className="space-y-4">
        <FormInput name="fullName" label="Full Name" placeholder="e.g. Rahul Jaggi" required />
        <FormInput name="email" label="Work Email" type="email" placeholder="name@enterprise.io" required />
        <FormInput name="phone" label="Phone Number" placeholder="+1 (555) 019-2834" required />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            name="role"
            label="Assigned Role"
            options={USER_ROLES.map((r) => ({ label: r, value: r }))}
            required
          />
          <FormSelect
            name="department"
            label="Department"
            options={USER_DEPARTMENTS.map((d) => ({ label: d, value: d }))}
            required
          />
        </div>

        <FormSelect
          name="status"
          label="Account Status"
          options={USER_STATUSES.map((s) => ({ label: s, value: s }))}
          required
        />

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <FormSubmitButton>Create User</FormSubmitButton>
        </div>
      </Form>
    </Modal>
  );
};
