import { AuthTokenPayload } from '../types';
export declare const generateToken: (payload: {
    id: string;
    email: string;
}) => string;
export declare const verifyToken: (token: string) => AuthTokenPayload;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
//# sourceMappingURL=auth.d.ts.map