export interface Context {
  user?: {
    id: string;
    email: string;
  };
}

export interface AuthTokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}