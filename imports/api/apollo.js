import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import typeDefs from './schema.graphql';
import { resolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  schema,
});
