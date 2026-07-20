import { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/ui/Button';
import { UserTable } from '../components/UserTable';
import { UserDrawer } from '../components/UserDrawer';
import { CreateUserModal } from '../components/CreateUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteUserDialog } from '../components/DeleteUserDialog';
import { useUsers } from '../hooks/useUsers';
import { User, UserStatus } from '../types/user.types';
import { Plus } from 'lucide-react';

export function UsersPage() {
  const {
    users,
    isLoading,
    isError,
    createUser,
    updateUser,
    toggleStatus,
    deleteUser,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleStatus = async (id: string, status: UserStatus) => {
    await toggleStatus({ id, status });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage organizational user accounts, roles, departments, and account statuses"
        action={
          <Button
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add New User
          </Button>
        }
      />

      <UserTable
        users={users}
        isLoading={isLoading}
        isError={isError}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      <UserDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitUser={async (data) => {
          await createUser(data);
        }}
      />

      <EditUserModal
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmitUpdate={async (data) => {
          await updateUser(data);
        }}
      />

      <DeleteUserDialog
        user={deletingUser}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirmDelete={async (id) => {
          await deleteUser(id);
        }}
      />
    </div>
  );
}

export default UsersPage;
