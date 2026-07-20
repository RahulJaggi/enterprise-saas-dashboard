import React, { useEffect } from 'react';
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
import { User, UpdateUserInput } from '../types/user.types';
import { toast } from '../../../components/ui/Toast';

const editUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2, 'Full name required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number required'),
  role: z.enum(USER_ROLES),
  department: z.string().min(2, 'Department required'),
  status: z.enum(USER_STATUSES),
});

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitUpdate: (data: UpdateUserInput) => Promise<void>;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
  onSubmitUpdate,
}) => {
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        status: user.status,
      });
    }
  }, [user, form]);

  if (!user) return null;

  const handleSubmit = async (data: UpdateUserInput) => {
    try {
      await onSubmitUpdate(data);
      toast.success('User updated successfully');
      onClose();
    } catch {
      toast.error('Failed to update user');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit User (${user.fullName})`} maxWidth="lg">
      <Form form={form} onSubmit={handleSubmit} className="space-y-4">
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="email" label="Work Email" type="email" required />
        <FormInput name="phone" label="Phone Number" required />

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
          <FormSubmitButton>Save Changes</FormSubmitButton>
        </div>
      </Form>
    </Modal>
  );
};
