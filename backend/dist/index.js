"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("./resolvers/schema");
const resolvers_1 = require("./resolvers");
const auth_1 = require("./middleware/auth");
const database_1 = __importDefault(require("./database"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
async function startServer() {
    // Connect to database
    await (0, database_1.default)();
    // Create Apollo Server
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: Number(PORT) },
        context: async ({ req }) => (0, auth_1.createContext)({ req }),
    });
    console.log(`🚀 Server ready at ${url}`);
}
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map