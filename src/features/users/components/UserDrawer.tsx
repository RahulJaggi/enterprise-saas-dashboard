import React from 'react';
import { Drawer } from '../../../components/ui/Drawer';
import { Avatar } from '../../../components/ui/Avatar';
import { UserStatusBadge } from './UserStatusBadge';
import { Mail, Phone, Building, Calendar, Shield } from 'lucide-react';
import { User } from '../types/user.types';

interface UserDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDrawer: React.FC<UserDrawerProps> = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="User Account Specification" size="md">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Avatar src={user.avatar} name={user.fullName} size="xl" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{user.fullName}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user.id}</p>
          </div>
          <UserStatusBadge status={user.status} />
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Email Address</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Phone Number</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Shield className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Assigned Role</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Building className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Department</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Creation Date</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
