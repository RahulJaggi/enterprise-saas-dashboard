import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Avatar } from '../../../components/ui/Avatar';
import { User } from '../types/user.types';
import { toast } from '../../../components/ui/Toast';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (id: string) => Promise<void>;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  user,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  if (!user) return null;

  const handleDelete = async () => {
    try {
      await onConfirmDelete(user.id);
      toast.success(`User ${user.fullName} deleted`);
      onClose();
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete User" maxWidth="sm">
      <div className="space-y-4 text-center">
        <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <Avatar src={user.avatar} name={user.fullName} size="lg" className="mx-auto" />

        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{user.fullName}</h4>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete User
          </Button>
        </div>
      </div>
    </Modal>
  );
};
