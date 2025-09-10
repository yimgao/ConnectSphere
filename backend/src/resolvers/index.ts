import { authResolvers } from './auth';
import { profileResolvers } from './profile';

export const resolvers = {
  Query: {
    ...authResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...profileResolvers.Mutation
  },
  User: {
    ...authResolvers.User
  }
};