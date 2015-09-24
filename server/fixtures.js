if (Meteor.users.find().count() === 0) {
    var userId = Accounts.createUser({
      username: "BOOM",
      email: "test@test.com",
      password: "password"
    });

    console.log("Seeded users");
  }

if(Drafts.find().count() === 0) {
  var draftId = Drafts.insert({
    isDone: null,
    isAuction: true,
    startingMoney: 100,
    timeInBetweenNomination: 30*1000,
    bidTime: 15*1000,

    userTurnIndex: 0,
    currentBidClock: 60*1000,
    currentPlayerUpForBidId: -1,
    currentBids:[]
  });

  console.log("Seeded drafts");
}
if(Leagues.find().count() === 0) {
  Leagues.insert({
    maxSize: 4,
    name: "Romeo Rumble",
    isDivisions: false,
    numberOfDivisionGames: 1,
    numberOfDivisions: 2,
    draftId: draftId,
    usersInLeague: [userId],
    leagueCreator: userId
  });

  console.log("Seeded leagues");
}

if (Players.find().count() === 0) {
  Players.insert({ name: "Tim Howard", skill: 100, position: "GK" });
  Players.insert({ name: "Neymar da Silva Santos Jr.", skill: 999, position: "LW" });

  console.log("Seeded players");
}

// Users need a teamSize
