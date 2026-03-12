import { useEffect } from 'react';
import { fetchUsers } from '../services/api';
import { useUsersContext } from '../context/UsersContext';

export const useUsers = () => {
  const { users, setUsers, loading, setLoading, error, setError } = useUsersContext();

  useEffect(() => {
    if (users.length) return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [users.length, setUsers, setLoading, setError]);

  return useUsersContext();
};

