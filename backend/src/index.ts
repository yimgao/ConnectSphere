import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { typeDefs } from './resolvers/schema';
import { resolvers } from './resolvers';
import { createContext } from './middleware/auth';
import connectDB from './database';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  // Connect to database
  await connectDB();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req }) => createContext({ req }),
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
