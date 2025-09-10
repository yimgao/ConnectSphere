export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginResponse {
  login: AuthPayload;
}

export interface RegisterResponse {
  register: AuthPayload;
}