const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
}

async function changeLeagueStatus(context, info, leagueId, from, to) {
  const userId = getUserId(context);
  const league = await context.db.query.league(
    { where: { id: leagueId } },
    `{ id status creator { id } }`
  );

  if (!league) {
    throw new Error(`No league for: ${leagueId}`);
  }

  if (league.status !== from) {
    throw new Error(`Cannot transition from ${league.status} to ${to}`);
  }

  if (league.creator.id !== userId) {
    throw new Error(`Only league creator can change the status`);
  }

  return context.db.mutation.updateLeague(
    {
      where: { id: leagueId },
      data: { status: to },
    },
    info
  );
}

async function duration({ seconds = 0, milliseconds = 0 } = {}) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), seconds * 1000 + milliseconds);
  });
}

async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
  changeLeagueStatus,
  duration,
  asyncForEach,
};
