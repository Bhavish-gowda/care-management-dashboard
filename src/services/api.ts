import axios from 'axios';
import type { User } from '../types/user';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await client.get<User[]>('/users');
  return response.data;
};
