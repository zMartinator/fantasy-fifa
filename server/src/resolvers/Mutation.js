const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId, changeLeagueStatus } = require('../utils');
const { startLoop } = require('../loop');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password },
    },
    `{ id }`
  );

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  };
}

async function login(parent, { name, password }, context, info) {
  const user = await context.db.query.user(
    { where: { name } },
    `{ id password }`
  );
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  };
}

async function joinLeague(parent, { id }, context, info) {
  const userId = getUserId(context);
  const league = await context.db.query.league(
    { where: { id } },
    `{ id maxSize status startingMoney members { id } }`
  );

  if (!league) {
    throw new Error(`No league for: ${id}`);
  } else if (league.status !== 'IDLE') {
    throw new Error(`Cannot join league in ${league.status}`);
  } else if (league.members.length === league.maxSize) {
    throw new Error(`League is full.`);
  } else if (league.members.filter(user => user.id === userId).length > 0) {
    throw new Error(`Already a member for: ${id}`);
  }

  return context.db.mutation.updateLeague(
    {
      where: { id },
      data: {
        members: { connect: [...league.members, { id: userId }] },
        teams: {
          create: [
            {
              money: league.startingMoney,
              owner: { connect: { id: userId } },
              players: [],
            },
          ],
        },
      },
    },
    info
  );
}

async function createLeague(parent, args, context, info) {
  const userId = getUserId(context);

  if (args.maxSize < 2 || args.maxSize > 17) {
    throw new Error('maxSize must be between 2 and 16.');
  } else if (args.teamSize < 11 && args.teamSize > 101) {
    throw new Error('teamSize must be between 11 and 100.');
  } else if (args.startingMoney < args.teamSize) {
    throw new Error('startingMoney must be more than teamSize.');
  } else if (args.nominationTime < 2) {
    throw new Error('nominationTime must be more than 2 seconds.');
  } else if (args.bidTime < 2) {
    throw new Error('bidTIme must be more than 2 seconds.');
  }

  return context.db.mutation.createLeague(
    {
      data: {
        ...args,
        creator: { connect: { id: userId } },
        members: { connect: [{ id: userId }] },
        teams: {
          create: [
            {
              money: args.startingMoney,
              owner: { connect: { id: userId } },
              players: [],
            },
          ],
        },
      },
    },
    info
  );
}

async function startDraft(parent, { leagueId }, context, info) {
  const selection = await changeLeagueStatus(
    context,
    info,
    leagueId,
    'IDLE',
    'IN_PROGRESS'
  );
  startLoop(leagueId);
  return selection;
}

async function pauseDraft(parent, { leagueId }, context, info) {
  const selection = await changeLeagueStatus(
    context,
    info,
    leagueId,
    'IN_PROGRESS',
    'PAUSED'
  );
  // TODO: Pause loop?
  return selection;
}

async function resumeDraft(parent, { leagueId }, context, info) {
  const selection = await changeLeagueStatus(
    context,
    info,
    leagueId,
    'PAUSED',
    'IN_PROGRESS'
  );
  // TODO: Resume loop?
  return selection;
}

async function nominatePlayer(parent, { leagueId, playerId }, context, info) {
  const userId = getUserId(context);
  const league = await context.db.query.league(
    { where: { id: leagueId } },
    `{
      id
      status
      playerUpForBid
      playersDrafted {
        id
      }
      userTurnOrder
      userTurnIndex
      nominationClock
      bidTime
      members { id }
    }`
  );

  if (!league) {
    throw new Error(`No league for: ${leagueId}.`);
  } else if (league.status !== 'IN_PROGRESS') {
    throw new Error(`League must be IN_PROGRESS.`);
  } else if (league.playerUpForBid !== null) {
    throw new Error(`A player, ${league.playerUpForBid} is already nominated.`);
  } else if (league.playersDrafted.filter(p => p.id === playerId).length > 0) {
    throw new Error(`Player, ${playerId} has already been drafted.`);
  } else if (
    userId !== league.members[league.userTurnOrder[league.userTurnIndex]].id
  ) {
    throw new Error(`It is not your turn to nominate.`);
  } else if (league.nominationClock <= 0) {
    throw new Error(`Nomination time is up.`);
  }

  return context.db.mutation.updateLeague(
    {
      where: { id: leagueId },
      data: {
        playerUpForBid: playerId,
        nominationClock: league.nominationTime,
        bidClock: league.bidTime,
        playersDrafted: {
          connect: [...league.playersDrafted, { id: playerId }],
        },
        highestBid: { create: { value: 1, user: { connect: { id: userId } } } },
      },
    },
    info
  );
}

async function bidOnPlayer(parent, { leagueId, amount }, context, info) {
  const userId = getUserId(context);
  const league = await context.db.query.league(
    { where: { id: leagueId } },
    `{
      id
      status
      playerUpForBid
      bidClock
      teams {
        money
        owner {
          id
        }
        players {
          id
        }
      }
      teamSize
      highestBid {
        value
        user {
          id
        }
      }
      bidTime
    }`
  );

  if (!league) {
    throw new Error(`No league for: ${leagueId}.`);
  } else if (league.status !== 'IN_PROGRESS') {
    throw new Error(`League must be IN_PROGRESS`);
  } else if (league.playerUpForBid === null) {
    throw new Error(`There is no one up for bid.`);
  } else if (league.bidClock <= 0) {
    throw new Error(`Bid time is up.`);
  } else if (league.highestBid.user.id === userId) {
    throw new Error(`You are already the max bidder.`);
  }

  const team = league.teams.filter(team => team.owner.id === userId)[0];
  if (!team) {
    throw new Error(`You are not in this league.`);
  }

  const playersRemaining = league.teamSize - team.players.length;
  const maxBidAmount = team.money - playersRemaining + 1;

  if (amount > maxBidAmount) {
    throw new Error(`This is above your max bid of ${maxBidAmount}.`);
  } else if (amount <= league.highestBid.value) {
    throw new Error(`${amount} is less than or equal to the max bid.`);
  }

  return context.db.mutation.updateLeague(
    {
      where: { id: leagueId },
      data: {
        bidClock: league.bidTime,
        highestBid: {
          create: { value: amount, user: { connect: { id: userId } } },
        },
      },
    },
    info
  );
}

module.exports = {
  signup,
  login,
  joinLeague,
  createLeague,
  startDraft,
  pauseDraft,
  resumeDraft,
  nominatePlayer,
  bidOnPlayer,
};
