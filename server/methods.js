Meteor.methods({

  "startDraft": function(leagueId) {
    check(leagueId, String);
    let currentLeague = Leagues.findOne(leagueId);

    Leagues.update(leagueId, {
      $set: {
        didNominateOnTime: false,
        currentNominationClock: currentLeague.startTimeBetweenNomination,
        isDraftDone: false,
        userTurnOrder: _.shuffle(currentLeague.usersInLeague)
      }
    });

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

      if( userId !== currentLeague.userTurnOrder[currentLeague.currentUserTurnIndex] ) {
        throw new Meteor.Error("out-of-turn", "It is not your turn to nominate");
      }

      Leagues.update(leagueId, {
        $set: {
          currentNominationClock: 0,
          currentPlayerUpForBidId: playerName,
          currentBidClock: currentLeague.startBidTime,
          didNominateOnTime: true
        },
        $push: {
          currentBids: {
            value: 1,
            userId: userId
          }
        }
      });

      Meteor.call("kickOffBidding", leagueId, playerName);

      return true;
  },



  "bidOnPlayer": function(leagueId, bidAmount, userId) {
    check(leagueId, String);
    check(bidAmount, Number);
    check(userId, String);
    let currentLeague = Leagues.findOne(leagueId);

    //console.log(`${bidAmount} should be greater than ${currentLeague.currentBids[currentLeague.currentBids.length - 1].value}`);

    if(bidAmount <= currentLeague.currentBids[currentLeague.currentBids.length - 1].value) {
      return false;
    }

    Leagues.update(leagueId, {
      $set: {
        currentBidClock: currentLeague.startBidTime
      },
      $push: {
        currentBids: {
          value: bidAmount,
          userId: userId
        }
      }
    });
    //console.log("BOOM");

    return true;
  },



  "kickOffNomination": function(leagueId) {
    check(leagueId, String);

    //console.log("kickoff: NOMINATION");

    var intervalId = Meteor.setInterval(function() {
      var currentLeague = Leagues.findOne(leagueId);

      //console.log(`currentNominationClock: ${currentLeague.currentNominationClock}`);

      if(currentLeague.currentNominationClock <= 0 && !currentLeague.didNominateOnTime) { // SKIP CONDITION
        Leagues.update(leagueId, {
          $set: {
            currentNominationClock: currentLeague.startTimeBetweenNomination,
            currentUserTurnIndex: (currentLeague.currentUserTurnIndex + 1) % currentLeague.userTurnOrder.length
          }
        });
      } else if(currentLeague.didNominateOnTime) {
        Meteor.clearInterval(intervalId);
      } else {
        Leagues.update(leagueId, {$inc: { currentNominationClock: -1 } });
        //console.log("decrement NOM clock");
      }

    }, 1000);

    return true;
  },




  "kickOffBidding": function(leagueId, playerName) {
    check(leagueId, String);
    check(playerName, String);

    //console.log("kickoff: BIDDING");

    var intervalId = Meteor.setInterval(function() {
      var currentLeague = Leagues.findOne(leagueId);

      if(currentLeague.currentBidClock <= 0) {
        Meteor.clearInterval(intervalId);
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

          if( nomUserOrder.length === 0 ) { // END CONDITION
            Leagues.update(leagueId, {
              $set: {
                isDraftDone: true
              }
            });

            return true;
          } else {
            Leagues.update(leagueId, {
              $set: {
                userTurnOrder: nomUserOrder
              }
            });
          }

          Leagues.update(leagueId, {
            $set: {
              didNominateOnTime: false,
              currentBids: [],
              currentPlayerUpForBidId: "",
              currentNominationClock: currentLeague.startTimeBetweenNomination,
              currentUserTurnIndex: (currentLeague.currentUserTurnIndex) % currentLeague.userTurnOrder.length - 1
            }
          });
        } else {
          Leagues.update(leagueId, {
            $set: {
              didNominateOnTime: false,
              currentBids: [],
              currentPlayerUpForBidId: "",
              currentNominationClock: currentLeague.startTimeBetweenNomination,
              currentUserTurnIndex: (currentLeague.currentUserTurnIndex + 1) % currentLeague.userTurnOrder.length
            }
          });
        }



        Meteor.call("kickOffNomination", leagueId);

      } else {
        Leagues.update(leagueId, {$inc: { currentBidClock: -1 } });
        //console.log("decrement BID clock");
      }
    }, 1000);

    return true;
  }


});
