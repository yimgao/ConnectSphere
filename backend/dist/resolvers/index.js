"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const auth_1 = require("./auth");
const profile_1 = require("./profile");
exports.resolvers = {
    Query: {
        ...auth_1.authResolvers.Query
    },
    Mutation: {
        ...auth_1.authResolvers.Mutation,
        ...profile_1.profileResolvers.Mutation
    },
    User: {
        ...auth_1.authResolvers.User
    }
};
//# sourceMappingURL=index.js.map