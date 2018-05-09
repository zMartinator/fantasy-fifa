require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const { getPrisma } = require('./prisma');
const { importPlayerData } = require('./seed');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: getPrisma(),
  }),
});

server.start(({ port }) => console.log(`Server is running on port: ${port}`));

if (process.env.SEED_PLAYERS === 'SEED') {
  importPlayerData().then(() => console.log(`Done seeding player data.`));
}
