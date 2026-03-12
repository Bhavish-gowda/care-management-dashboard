import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import type { NewUser, User } from '../types/user';
import type { FormSubmission } from '../types/forms';

export type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  searchQuery: string;
};

type UsersContextValue = UsersState & {
  setUsers: (users: User[]) => void;
  addUser: (user: NewUser) => void;
  updateUser: (id: number, updates: Partial<NewUser>) => void;
  deleteUser: (id: number) => void;
  selectUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getUserSubmissions: (userId: number, submissions: FormSubmission[]) => FormSubmission[];
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

type UsersProviderProps = {
  children: ReactNode;
};

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsersState] = useState<User[]>([]);
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const setUsers = (next: User[]) => setUsersState(next);

  const addUser = (user: NewUser) => {
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsersState([...users, { ...user, id: nextId }]);
  };

  const updateUser = (id: number, updates: Partial<NewUser>) => {
    setUsersState((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    setSelectedUser((prev) => (prev && prev.id === id ? { ...prev, ...updates } : prev));
  };

  const deleteUser = (id: number) => {
    setUsersState((prev) => prev.filter((u) => u.id !== id));
    setSelectedUser((prev) => (prev && prev.id === id ? null : prev));
  };

  const selectUser = (user: User | null) => setSelectedUser(user);
  const setLoading = (value: boolean) => setLoadingState(value);
  const setError = (value: string | null) => setErrorState(value);

  const getUserSubmissions = (userId: number, submissions: FormSubmission[]) =>
    submissions.filter((s) => s.userId === userId);

  const value: UsersContextValue = useMemo(
    () => ({
      users,
      loading,
      error,
      selectedUser,
      searchQuery,
      setUsers,
      addUser,
      updateUser,
      deleteUser,
      selectUser,
      setSearchQuery,
      setLoading,
      setError,
      getUserSubmissions
    }),
    [users, loading, error, selectedUser, searchQuery]
  );

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsersContext = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error('useUsersContext must be used within UsersProvider');
  }
  return ctx;
};
