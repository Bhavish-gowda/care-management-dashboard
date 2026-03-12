import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUsers } from '../hooks/useUsers';
import UserSearch from '../components/users/UserSearch';
import UserCard from '../components/users/UserCard';
import UserModal from '../components/users/UserModal';
import UserForm from '../components/users/UserForm';
import type { NewUser, User } from '../types/user';

const UsersPage = () => {
  const {
    users,
    loading,
    error,
    searchQuery,
    addUser,
    updateUser,
    selectUser,
    selectedUser,
    setSearchQuery
  } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q);
  });

  const handleCardClick = (user: User) => {
    selectUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = (values: NewUser) => {
    addUser(values);
    toast.success('User added successfully.');
  };

  const handleAddUserFromModal = (values: NewUser) => {
    handleAddUser(values);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (values: NewUser) => {
    if (!editingUser) return;
    updateUser(editingUser.id, values);
    setEditingUser(null);
    toast.success('User updated successfully.');
  };

  const handleOpenEdit = () => {
    if (selectedUser) {
      setEditingUser(selectedUser);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-slate-50">Users</h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Manage residents and caregivers in the Careflick system.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingUser(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
        >
          + Add User
        </button>
      </div>

      <UserSearch />

      {editingUser !== null && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-sm ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                {editingUser ? 'Edit User' : 'Add User'}
              </h2>
              <p className="text-xs text-slate-400">
                {editingUser
                  ? 'Update details for this user.'
                  : 'Create a new user in the system.'}
              </p>
            </div>
          </div>
          <UserForm
            initialUser={editingUser ?? undefined}
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-sm ring-1 ring-white/5 transition-all duration-200">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="group flex flex-col items-start rounded-2xl border border-white/5 bg-slate-900/80 p-4 text-left shadow-sm ring-1 ring-white/5 animate-pulse"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-800" />
                    <div className="space-y-1">
                      <div className="h-3 w-28 rounded-full bg-slate-800" />
                      <div className="h-2.5 w-20 rounded-full bg-slate-800" />
                    </div>
                  </div>
                  <div className="h-4 w-10 rounded-full bg-slate-800" />
                </div>
                <div className="space-y-2 w-full">
                  <div className="h-2.5 w-40 rounded-full bg-slate-800" />
                  <div className="h-2.5 w-32 rounded-full bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
              <span className="text-xl">🔍</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">No users found</p>
              <p className="mt-1 text-xs text-slate-400">
                Try clearing your search filters or add a new user to get started.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-200 transition-all duration-200 hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                Clear search
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
              >
                + Add User
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div key={user.id} onClick={() => handleCardClick(user)}>
                <UserCard user={user} />
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-3 py-6 sm:px-4 md:py-10">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900/95 shadow-2xl ring-1 ring-white/10 transform transition-all duration-200 scale-100">
            <div className="flex items-center justify-between border-b border-white/5 px-4 sm:px-5 py-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Add New User</h2>
                <p className="text-[11px] text-slate-400">
                  Create a new resident or caregiver profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-full px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="px-4 sm:px-5 py-4">
              <UserForm
                initialUser={null}
                onSubmit={handleAddUserFromModal}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UsersPage;

