import type { User } from '../../types/user';
import { useUsersContext } from '../../context/UsersContext';
import { Mail, Phone } from 'lucide-react';

type UserCardProps = {
  user: User;
};

const getInitials = (name: string) => {
  const parts = name.split(' ').filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase();
};

const UserCard = ({ user }: UserCardProps) => {
  const { selectUser } = useUsersContext();

  return (
    <button
      type="button"
      onClick={() => selectUser(user)}
      className="group flex flex-col items-start rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left shadow-sm ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/20 hover:border-brand-400/60 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white shadow-sm">
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-semibold text-slate-50 group-hover:text-white">
              {user.name}
            </h3>
            <p className="text-[11px] text-slate-400">Resident / Care profile</p>
          </div>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-500/30">
          #{user.id.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-slate-300 w-full">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-slate-200">
            <Mail className="h-3 w-3" />
          </span>
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-slate-200">
            <Phone className="h-3 w-3" />
          </span>
          <span>{user.phone}</span>
        </div>
      </div>
    </button>
  );
};

export default UserCard;
