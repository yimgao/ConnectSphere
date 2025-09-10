"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.createContext = void 0;
const auth_1 = require("../utils/auth");
const createContext = ({ req }) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return {};
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        return {
            user: {
                id: decoded.id,
                email: decoded.email
            }
        };
    }
    catch (error) {
        return {};
    }
};
exports.createContext = createContext;
const requireAuth = (context) => {
    if (!context.user) {
        throw new Error('Authentication required');
    }
    return context.user;
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map