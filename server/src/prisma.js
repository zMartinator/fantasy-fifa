const { Prisma } = require('prisma-binding');

let prisma = null;

function getPrisma() {
  if (prisma === null) {
    prisma = new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      // debug: process.env.PRISMA_STAGE !== 'prod',
      debug: false,
    });
  }
  return prisma;
}

module.exports = {
  getPrisma,
};
