import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../../components/table/DataTable';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { UserStatusBadge } from './UserStatusBadge';
import { User, UserStatus } from '../types/user.types';
import { Eye, Edit2, Trash2, Power } from 'lucide-react';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  isError?: boolean;
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleStatus: (id: string, status: UserStatus) => void;
}

export function UserTable({
  users,
  isLoading = false,
  isError = false,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onToggleStatus,
}: UserTableProps) {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-slate-300 text-indigo-600"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'fullName',
        header: 'User',
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar src={u.avatar} name={u.fullName} size="sm" />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{u.fullName}</p>
                <p className="text-[11px] text-slate-400">{u.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <Badge variant={row.original.role === 'Super Admin' ? 'info' : 'neutral'} size="sm">
            {row.original.role}
          </Badge>
        ),
      },
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => <span className="font-medium">{row.original.department}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const u = row.original;
          const nextStatus: UserStatus = u.status === 'Active' ? 'Inactive' : 'Active';
          return (
            <div className="flex items-center gap-2">
              <UserStatusBadge status={u.status} />
              <button
                onClick={() => onToggleStatus(u.id, nextStatus)}
                className="p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`Toggle status to ${nextStatus}`}
              >
                <Power className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => <span className="font-mono text-slate-400">{row.original.createdAt}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const u = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              <Button variant="ghost" size="sm" onClick={() => onViewUser(u)} title="View Details">
                <Eye className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEditUser(u)} title="Edit User">
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteUser(u)}
                title="Delete User"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [onViewUser, onEditUser, onDeleteUser, onToggleStatus]
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      isError={isError}
      searchPlaceholder="Search users by name, email, or role..."
    />
  );
}
