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


    "CreateLeague": function(formLeagueName, formLeagueIsDivisions, formLeagueSize, formLeagueNumberOfDivisionGames, formLeagueNumberOfDivisions) {
      check(formLeagueName, Match.Where(function(name) {
        check(name, String);
        return (name.length > 0 && name.length < 31);
      }));
      check(formLeagueSize, Match.Where(function(leagueSize) {
        check(leagueSize, Number);
        return leagueSize < 128;
      }));
      check(formLeagueNumberOfDivisionGames, Match.Where(function(numberOfDivisionGames) {
        check(numberOfDivisionGames, Number);
        return numberOfDivisionGames < 10;
      }));
      check(formLeagueNumberOfDivisions, Match.Where(function(numberOfDivisions) {
        check(numberOfDivisions, Number);
        return numberOfDivisions < 8;
      }));
      check(formLeagueIsDivisions, Boolean);

      if( !Meteor.userId() ) {
        throw new Meteor.Error("not-logged-in", "You must be logged in to create a league");
      }

      var draftId = Drafts.insert({
        isAuction: true,
        startingMoney: 100,
        timeInBetweenNomination: 30*1000,
        bidTime: 15*1000,
        bidClock: 60*1000,
        currentPlayerUpForBidId: -1,
        bids:[]
      });

      Leagues.insert({
        maxSize: formLeagueSize,
        name: formLeagueName,
        isDivisions: formLeagueIsDivisions,
        numberOfDivisionGames: formLeagueNumberOfDivisionGames,
        numberOfDivisions: formLeagueNumberOfDivisions,
        draftId: draftId,
        usersInLeague: [Meteor.userId()],
        leagueCreator: Meteor.userId()
      });

    }
});
