import { IncomingMessage } from 'http';
import { Context } from '../types';
export declare const createContext: ({ req }: {
    req: IncomingMessage;
}) => Context;
export declare const requireAuth: (context: Context) => {
    id: string;
    email: string;
};
//# sourceMappingURL=auth.d.ts.map