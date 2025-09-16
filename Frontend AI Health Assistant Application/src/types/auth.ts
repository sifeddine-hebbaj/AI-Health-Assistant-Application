export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // Backend returns enum values like PATIENT/ADMIN; allow both cases
  role: 'patient' | 'admin' | 'doctor' | 'PATIENT' | 'ADMIN' | string;
  createdAt?: string;
}

// Legacy shape no longer used (kept for reference)
export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: any) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
}