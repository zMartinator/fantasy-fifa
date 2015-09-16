if(Leagues.find().count() === 0) {
  Leagues.insert({
    maxSize: 4,
    name: "Romeo Rumble",
    isDivisions: false,
    numberOfDivisionGames: 1,
    draftId: -1,
    usersInLeague: []
  });

  console.log("Seeded leagues");
}

if (Players.find().count() === 0) {
  Players.insert({ name: "Tim Howard", skill: 100, position: "GK" });
  Players.insert({ name: "Neymar da Silva Santos Jr.", skill: 999, position: "LW" });

  console.log("Seeded players");
}

if(Drafts.find().count() === 0) {
  Drafts.insert({
    startTime: moment().startOf("hour"),
    leagueId: Leagues.findOne()._id,
    isAuction: true,
    startingMoney: 100,
    timeInBetweenNomination: 30*1000,
    bidTime: 15*1000,
    bidClock: 60*1000,
    currentPlayerUpForBidId: -1,
    bids:[ { userWhoBidName: "Ben", bidAmount: 1 }, { userWhoBidName: "Zach", bidAmount: 2 } ]
  });

  console.log("Seeded drafts");
}


// Users need a teamSize
