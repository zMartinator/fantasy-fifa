import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Leagues, League } from './collections';

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
  },

  "startDraft": function(leagueId) {
    check(leagueId, String);
    let currentLeague = Leagues.findOne(leagueId);

    // TODO: Set all users money in League to starting amount.
    // TODO: change the limit for the league to the current League Size.

    currentLeague.set("didNominateOnTime", false);
    currentLeague.set("currentNominationClock", currentLeague.startTimeBetweenNomination);
    currentLeague.set("isDraftDone", false);
    currentLeague.set("userTurnOrder", _.shuffle(currentLeague.usersInLeague));

    currentLeague.save();

    Meteor.call("kickOffNomination", leagueId);

    return true;
  },



  "nominatePlayer": function(playerName, leagueId, userId) {
      check(playerName, String);
      check(leagueId, String);
      check(userId, String);

      if( !userId ) {
        throw new Meteor.Error("not-logged-in", "You must be logged in to nominate a player");
      }

      // TODO: Check that player is available still.
      let currentLeague = Leagues.findOne(leagueId);
      let currentUser = Meteor.users.findOne(userId);

      if( userId !== currentLeague.userTurnOrder[currentLeague.currentUserTurnIndex] ) {
        throw new Meteor.Error("out-of-turn", "It is not your turn to nominate");
      }

      currentLeague.set("currentNominationClock", 0);
      currentLeague.set("currentPlayerUpForBidId", playerName);
      currentLeague.set("currentBidClock", currentLeague.startBidTime);
      currentLeague.set("didNominateOnTime", true);
      currentLeague.push("currentBids", {
        value: 1,
        userId: userId,
        username: currentUser.username
      });

      currentLeague.save();


      Meteor.call("kickOffBidding", leagueId, playerName);

      return true;
  },



  "bidOnPlayer": function(leagueId, bidAmount, userId) {
    check(leagueId, String);
    check(bidAmount, Number);
    check(userId, String);
    let currentLeague = Leagues.findOne(leagueId);
    let currentUser = Meteor.users.findOne(userId);

    // TODO: check if bidAmount is > maxBid and if it is return false.
    if(bidAmount <= currentLeague.currentBids[currentLeague.currentBids.length - 1].value) {
      return false;
    }

    currentLeague.set("currentBidClock", currentLeague.startBidTime);
    currentLeague.push("currentBids", {
      value: bidAmount,
      userId: userId,
      username: currentUser.username
    });
    currentLeague.save();

    return true;
  },



  "kickOffNomination": function(leagueId) {
    check(leagueId, String);

    var intervalId = Meteor.setInterval(function() {
      var currentLeague = Leagues.findOne(leagueId);

      if(currentLeague.currentNominationClock <= 0 && !currentLeague.didNominateOnTime) { // SKIP CONDITION
        currentLeague.set("currentNominationClock", currentLeague.startTimeBetweenNomination);
        currentLeague.set("currentUserTurnIndex", (currentLeague.currentUserTurnIndex + 1) % currentLeague.userTurnOrder.length);
        currentLeague.save();
      } else if(currentLeague.didNominateOnTime) {
        Meteor.clearInterval(intervalId);
      } else {
        currentLeague.inc("currentNominationClock", -1);
        currentLeague.save();
      }

    }, 1000);

    return true;
  },




  "kickOffBidding": function(leagueId, playerName) {
    check(leagueId, String);
    check(playerName, String);

    var intervalId = Meteor.setInterval(function() {
      var currentLeague = Leagues.findOne(leagueId);

      if(currentLeague.currentBidClock <= 0) {
        Meteor.clearInterval(intervalId);
        // TODO: convert Meteor.users to Astronomy?!
        Meteor.users.update(currentLeague.currentBids[currentLeague.currentBids.length - 1].userId, {
          $inc: {
            "profile.draftMoney": -1 * currentLeague.currentBids[currentLeague.currentBids.length - 1].value
          },
          $push: {
            "profile.team.players": {
              playerName: currentLeague.currentPlayerUpForBidId,
              boughtFor: currentLeague.currentBids[currentLeague.currentBids.length - 1].value

            }
          }
        });

        // If user's team is full, remove them.
        if(Meteor.users.findOne(currentLeague.currentBids[currentLeague.currentBids.length - 1].userId).profile.team.players.length >= currentLeague.maxTeamSize) {
          var nomUserOrder = _.without(currentLeague.userTurnOrder, currentLeague.currentBids[currentLeague.currentBids.length - 1].userId);

          if( nomUserOrder.length === 0 ) {
            currentLeague.set("isDraftDone", true);
            currentLeague.save();
            return true;
          } else {
            currentLeague.set("userTurnOrder", nomUserOrder);
            currentLeague.save(); // TODO: remove this? save once at end if possible.
          }

          currentLeague.set("didNominateOnTime", false);
          currentLeague.set("currentBids", []);
          currentLeague.set("currentPlayerUpForBidId", "");
          currentLeague.set("currentNominationClock", currentLeague.startTimeBetweenNomination);
          currentLeague.set("currentUserTurnIndex", (currentLeague.currentUserTurnIndex) % currentLeague.userTurnOrder.length - 1 ); // DIFFERENCE HERE
          currentLeague.save();
        } else {
          currentLeague.set("didNominateOnTime", false);
          currentLeague.set("currentBids", []);
          currentLeague.set("currentPlayerUpForBidId", "");
          currentLeague.set("currentNominationClock", currentLeague.startTimeBetweenNomination);
          currentLeague.set("currentUserTurnIndex", (currentLeague.currentUserTurnIndex + 1) % currentLeague.userTurnOrder.length ); // DIFFERENCE HERE
          currentLeague.save();
        }

        Meteor.call("kickOffNomination", leagueId);

      } else {
        currentLeague.inc("currentBidClock", -1);
        currentLeague.save();
      }
    }, 1000);

    return true;
  }

});
