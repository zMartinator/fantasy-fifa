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

        foundLeague.push("usersInLeague", userId);
        foundLeague.save();
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

      if( !Meteor.userId() ) {
        throw new Meteor.Error("not-logged-in", "You must be logged in to create a league");
      }

      var createdLeague = new League();
      createdLeague.set("usersInLeague", [Meteor.userId()]);
      createdLeague.set("leagueCreator", Meteor.userId());
      createdLeague.set("name", formLeagueName);
      createdLeague.set("maxLeagueSize", formLeagueUserSize);
      createdLeague.set("maxTeamSize", formMaxTeamSize);
      createdLeague.set("auctionStartingMoney", formAuctionStartingMoney);
      createdLeague.set("startTimeBetweenNomination", formTimeBetweenNomination);
      createdLeague.set("startBidTime", formBidTime);
      createdLeague.set("isDraftDone", null );
      createdLeague.set("userTurnOrder", [] );
      createdLeague.set("currentUserTurnIndex", 0 );
      createdLeague.set("currentBidClock", 0 );
      createdLeague.set("currentNominationClock", 0 );
      createdLeague.set("currentPlayerUpForBidId", "" );
      createdLeague.set("currentBids", [] );
      createdLeague.set("didNominateOnTime", false );

      createdLeague.save();


    }
});
