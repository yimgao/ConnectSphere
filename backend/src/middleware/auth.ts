import { IncomingMessage } from 'http';
import { verifyToken } from '../utils/auth';
import { Context } from '../types';

export const createContext = ({ req }: { req: IncomingMessage }): Context => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return {};
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = verifyToken(token);
    return {
      user: {
        id: decoded.id,
        email: decoded.email
      }
    };
  } catch (error) {
    return {};
  }
};

export const requireAuth = (context: Context) => {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
};