import { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { useUsersContext } from '../../context/UsersContext';

const UserSearch = () => {
  const { searchQuery, setSearchQuery } = useUsersContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="mb-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search users by name or email..."
          className="w-full rounded-full border border-slate-700 bg-slate-900/80 pl-9 pr-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default UserSearch;
