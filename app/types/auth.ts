
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data?: {
    id: number;
    email: string;
  };
}

export interface RegisterCredentials {
  user_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
  code?: string;
}