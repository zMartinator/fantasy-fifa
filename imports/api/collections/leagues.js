import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const Leagues = new Mongo.Collection('leagues');

const Bid = Class.create({
  name: 'Bid',
  fields: {
    value: Number,
    userId: String,
    username: String,
  }
});

const League = Class.create({
  name: 'League',
  collection: Leagues,
  fields: {
    usersInLeague: [String],
    leagueCreator: String,

    name: String,
    maxLeagueSize: Number,
    maxTeamSize: Number,
    auctionStartingMoney: Number,
    startTimeBetweenNomination: Number,
    startBidTime: Number,

    isDraftDone: Boolean,
    userTurnOrder: [String],
    currentUserTurnIndex: Number,
    currentBidClock: Number,
    currentNominationClock: Number,
    currentPlayerUpForBidId: String,
    currentBids: [Bid],
    didNominateOnTime: Boolean,
  }
});

export {
  Leagues,
  League,
};
