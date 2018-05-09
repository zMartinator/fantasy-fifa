const { getUserId } = require('../utils');

async function leagues(parent, args, ctx, info) {
  return ctx.db.query.leagues({}, info);
}

async function league(parent, { id }, ctx, info) {
  return ctx.db.query.league({ where: { id } }, info);
}

async function user(parent, args, ctx, info) {
  let userId;
  try {
    userId = getUserId(ctx);
  } catch (e) {
    if (e.message === 'Not authenticated') {
      return null;
    }
  }
  return ctx.db.query.user({ where: { id: userId } }, info);
}

async function playersByName(parent, { query }, ctx, info) {
  if (query.length <= 1) {
    return [];
  }
  return ctx.db.query.players(
    {
      where: {
        OR: [
          { name_contains: query },
          { commonName_contains: query },
          { firstName_contains: query },
          { lastName_contains: query },
        ],
      },
      orderBy: 'rating_DESC',
      first: 5,
    },
    info
  );
}

async function player(parent, { id }, ctx, info) {
  return ctx.db.query.player({ where: { id } }, info);
}

module.exports = {
  leagues,
  league,
  user,
  playersByName,
  player,
};
