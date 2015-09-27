Leagues = new Mongo.Collection("leagues");

Meteor.methods({
    "registerUserForLeague": function(leagueId, userId) {
        check(leagueId, String);
        check(userId, String);

        var foundLeague = Leagues.findOne(leagueId);

        if(!foundLeague) {
          throw new Meteor.Error("invalid-league", "League not found");
        }

        if(foundLeague.usersInLeague.length >= foundLeague.maxSize) {
          throw new Meteor.Error("league-full", "This league is already full");
        }

        Leagues.update(leagueId, { $push: {usersInLeague: userId} }, function(err, numberOfAffectedDocs) {
            if(err) throw new Meteor.Error("invalid-league", "League not found");
        });
    },


    "CreateLeague": function(formLeagueName, formLeagueUserSize, formMaxTeamSize, formAuctionStartingMoney, formTimeBetweenNomination, formBidTime) {
      check(formLeagueName, Match.Where(function(name) {
        check(name, String);
        return (name.length > 0 && name.length < 31);
      }));
      check(formLeagueUserSize, Match.Where(function(leagueSize) {
        check(leagueSize, Number);
        return leagueSize >= 2 && leagueSize < 128;
      }));
      check(formMaxTeamSize, Match.Where(function(maxTeamSize) {
        check(maxTeamSize, Number);
        return maxTeamSize > 0 && maxTeamSize < 100;
      }));
      check(formAuctionStartingMoney, Match.Where(function(startingMoney) {
        check(startingMoney, Number);
        return startingMoney >= formMaxTeamSize;
      }));
      check(formTimeBetweenNomination, Match.Where(function(time) {
        check(time, Number);
        return time >= 2;
      }));
      check(formBidTime, Match.Where(function(time) {
        check(time, Number);
        return time >= 2;
      }));

      /*
      check(formLeagueNumberOfDivisionGames, Match.Where(function(numberOfDivisionGames) {
        check(numberOfDivisionGames, Number);
        return numberOfDivisionGames < 10;
      }));
      check(formLeagueNumberOfDivisions, Match.Where(function(numberOfDivisions) {
        check(numberOfDivisions, Number);
        return numberOfDivisions < 8;
      }));
      check(formLeagueIsDivisions, Boolean);
      */
      if( !Meteor.userId() ) {
        throw new Meteor.Error("not-logged-in", "You must be logged in to create a league");
      }


      Leagues.insert({
        usersInLeague: [Meteor.userId()],
        leagueCreator: Meteor.userId(),

        name: formLeagueName,
        maxLeagueSize: formLeagueUserSize,
        maxTeamSize: formMaxTeamSize,
        auctionStartingMoney: formAuctionStartingMoney,
        startTimeBetweenNomination: formTimeBetweenNomination,
        startBidTime: formBidTime,

        isDraftDone: null,
        userTurnOrder: [],
        currentUserTurnIndex: 0,
        currentBidClock: -1,
        currentNominationClock: -1,
        currentPlayerUpForBidId: "",
        currentBids:[],

        didNominateOnTime: false
      });

    }
});
