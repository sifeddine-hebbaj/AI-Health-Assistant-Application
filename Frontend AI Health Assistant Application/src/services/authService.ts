import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/auth';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData: RegisterData): Promise<User> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};