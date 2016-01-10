const Leagues = new Mongo.Collection("leagues");

const Bid = Astro.Class({
  name: "Bid",
  fields: {
    value: "number",
    userId: "string",
    username: "string"
  }
});

const League = Astro.Class({
  name: "League",
  collection: Leagues,
  fields: {
    usersInLeague: {
      type: "array",
      nested: "string",
      default: function () {
        return [];
      }
    },
    leagueCreator: "string",

    name: "string",
    maxLeagueSize: "number",
    maxTeamSize: "number",
    auctionStartingMoney: "number",
    startTimeBetweenNomination: "number",
    startBidTime: "number",

    isDraftDone: "boolean",
    userTurnOrder: {
      type: "array",
      nested: "string",
      default: function () {
        return [];
      }
    },
    currentUserTurnIndex: "number",
    currentBidClock: "number",
    currentNominationClock: "number",
    currentPlayerUpForBidId: "string",
    currentBids: {
      type: "array",
      nested: "Bid",
      default: function () {
        return [];
      }
    },
    didNominateOnTime: "boolean"
  }
});

export { Leagues, League };
