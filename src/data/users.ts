import { hashPassword } from '../utils/auth';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'basic' | 'premium';
  createdAt: Date;
}

export const USERS: User[] = [
  {
    id: '1',
    username: 'tej12',
    passwordHash: hashPassword('tej123'),
    name: 'Tej',
    email: 'tej12@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tej',
    role: 'premium',
    createdAt: new Date('2024-01-01')
  }
]; 