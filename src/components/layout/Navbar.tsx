import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="border-b border-white/5 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white shadow-sm">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">Careflick Dashboard</span>
            <span className="text-[11px] text-slate-400 hidden sm:block">
              Care management operations overview
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-1 text-xs font-medium rounded-full bg-slate-900/60 p-1 border border-white/5">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-100 text-slate-900 shadow-sm scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:scale-[1.02]'
              }`
            }
          >
            <Users className="h-3.5 w-3.5" />
            <span>Users</span>
          </NavLink>
          <NavLink
            to="/forms"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-100 text-slate-900 shadow-sm scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:scale-[1.02]'
              }`
            }
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Care Forms</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
