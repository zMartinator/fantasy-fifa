import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import _ from 'lodash';
import { League, User } from './collections';
import maxBid from '../utils/maxBid';

Meteor.methods({
  registerUserForLeague(leagueId, userId) {
    check(leagueId, String);
    check(userId, String);

    const foundLeague = League.findOne(leagueId);

    if (!foundLeague) {
      throw new Meteor.Error('invalid-league', 'League not found');
    }

    if (foundLeague.usersInLeague.length >= foundLeague.maxSize) {
      throw new Meteor.Error('league-full', 'This league is already full');
    }

    foundLeague.usersInLeague.push(userId);
    foundLeague.save();
  },

  CreateLeague(
    formLeagueName,
    formLeagueUserSize,
    formMaxTeamSize,
    formAuctionStartingMoney,
    formTimeBetweenNomination,
    formBidTime,
  ) {
    check(
      formLeagueName,
      Match.Where(name => {
        check(name, String);
        return name.length > 0 && name.length < 31;
      }),
    );
    check(
      formLeagueUserSize,
      Match.Where(leagueSize => {
        check(leagueSize, Number);
        return leagueSize >= 2 && leagueSize < 128;
      }),
    );
    check(
      formMaxTeamSize,
      Match.Where(maxTeamSize => {
        check(maxTeamSize, Number);
        return maxTeamSize > 0 && maxTeamSize < 100;
      }),
    );
    check(
      formAuctionStartingMoney,
      Match.Where(startingMoney => {
        check(startingMoney, Number);
        return startingMoney >= formMaxTeamSize;
      }),
    );
    check(
      formTimeBetweenNomination,
      Match.Where(time => {
        check(time, Number);
        return time >= 2;
      }),
    );
    check(
      formBidTime,
      Match.Where(time => {
        check(time, Number);
        return time >= 2;
      }),
    );

    if (!Meteor.userId()) {
      throw new Meteor.Error(
        'not-logged-in',
        'You must be logged in to create a league',
      );
    }

    const createdLeague = new League();
    createdLeague.usersInLeague = [Meteor.userId()];
    createdLeague.leagueCreator = Meteor.userId();
    createdLeague.name = formLeagueName;
    createdLeague.maxLeagueSize = formLeagueUserSize;
    createdLeague.maxTeamSize = formMaxTeamSize;
    createdLeague.auctionStartingMoney = formAuctionStartingMoney;
    createdLeague.startTimeBetweenNomination = formTimeBetweenNomination;
    createdLeague.startBidTime = formBidTime;
    createdLeague.isDraftDone = false;
    createdLeague.userTurnOrder = [];
    createdLeague.currentUserTurnIndex = 0;
    createdLeague.currentBidClock = 0;
    createdLeague.currentNominationClock = 0;
    createdLeague.currentPlayerUpForBidId = '';
    createdLeague.currentBids = [];
    createdLeague.didNominateOnTime = false;

    createdLeague.save();
  },

  startDraft(leagueId) {
    check(leagueId, String);
    const currentLeague = League.findOne(leagueId);

    // TODO: Set all users money in League to starting amount.
    // TODO: change the limit for the league to the current League Size.

    currentLeague.didNominateOnTime = false;
    currentLeague.currentNominationClock =
      currentLeague.startTimeBetweenNomination;
    currentLeague.isDraftDone = false;
    currentLeague.userTurnOrder = _.shuffle(currentLeague.usersInLeague);

    currentLeague.save();

    Meteor.call('kickOffNomination', leagueId);

    return true;
  },

  nominatePlayer(playerName, leagueId) {
    // TODO: Change this to playerId
    check(playerName, String);
    check(leagueId, String);
    const userId = Meteor.userId();

    if (!userId) {
      throw new Meteor.Error(
        'not-logged-in',
        'You must be logged in to nominate a player',
      );
    }

    // TODO: Check that player is available still.
    // if isn't return false immediately

    const currentLeague = League.findOne(leagueId);

    if (
      userId !== currentLeague.userTurnOrder[currentLeague.currentUserTurnIndex]
    ) {
      throw new Meteor.Error('out-of-turn', 'It is not your turn to nominate');
    }

    currentLeague.currentNominationClock = 0;
    currentLeague.currentPlayerUpForBidId = playerName;
    currentLeague.currentBidClock = currentLeague.startBidTime;
    currentLeague.didNominateOnTime = true;
    currentLeague.currentBids.push({
      value: 1,
      userId,
      username: Meteor.user().username,
    });

    currentLeague.save();

    Meteor.call('kickOffBidding', leagueId, playerName);

    return true;
  },

  bidOnPlayer(leagueId, bidAmount) {
    check(leagueId, String);
    check(bidAmount, Number);
    const currentUser = Meteor.user();
    const userId = currentUser._id;
    const currentLeague = League.findOne(leagueId);
    const highestBid =
      currentLeague.currentBids[currentLeague.currentBids.length - 1];

    if (bidAmount > maxBid(currentUser, currentLeague)) {
      return false;
    }

    if (bidAmount <= highestBid.value) {
      return false;
    }

    currentLeague.currentBidClock = currentLeague.startBidTime;
    currentLeague.currentBids.push({
      value: bidAmount,
      userId,
      username: currentUser.username,
    });
    currentLeague.save();

    return true;
  },

  kickOffNomination(leagueId) {
    check(leagueId, String);

    const intervalId = Meteor.setInterval(() => {
      const currentLeague = League.findOne(leagueId);

      if (
        currentLeague.currentNominationClock <= 0 &&
        !currentLeague.didNominateOnTime
      ) {
        // SKIP CONDITION
        currentLeague.currentNominationClock =
          currentLeague.startTimeBetweenNomination;
        currentLeague.currentUserTurnIndex =
          (currentLeague.currentUserTurnIndex + 1) %
          currentLeague.userTurnOrder.length;
        currentLeague.save();
      } else if (currentLeague.didNominateOnTime) {
        Meteor.clearInterval(intervalId);
      } else {
        currentLeague.currentNominationClock -= 1;
        currentLeague.save();
      }
    }, 1000);

    return true;
  },

  kickOffBidding(leagueId, playerName) {
    // TODO: convert to playerId
    check(leagueId, String);
    check(playerName, String);

    const intervalId = Meteor.setInterval(() => {
      const currentLeague = League.findOne(leagueId);

      const highestBid =
        currentLeague.currentBids[currentLeague.currentBids.length - 1];

      if (currentLeague.currentBidClock <= 0) {
        Meteor.clearInterval(intervalId);
        const user = User.findOne(highestBid.userId);
        user.profile.draftMoney -= highestBid.value;
        user.profile.team.players.push({
          playerName: currentLeague.currentPlayerUpForBidId,
          boughtFor: highestBid.value,
        });
        user.save();

        currentLeague.didNominateOnTime = false;
        currentLeague.currentBids = [];
        currentLeague.currentPlayerUpForBidId = '';
        currentLeague.currentNominationClock =
          currentLeague.startTimeBetweenNomination;

        // If user's team is full, remove them.
        if (
          User.findOne(highestBid.userId).profile.team.players.length >=
          currentLeague.maxTeamSize
        ) {
          const nomUserOrder = currentLeague.userTurnOrder.filter(
            userId => userId !== highestBid.userId,
          );

          currentLeague.userTurnOrder = nomUserOrder;

          if (nomUserOrder.length === 0) {
            currentLeague.isDraftDone = true;
            currentLeague.save();
            return true;
          }

          currentLeague.currentUserTurnIndex =
            currentLeague.currentUserTurnIndex %
              currentLeague.userTurnOrder.length -
            1;
        } else {
          currentLeague.currentUserTurnIndex =
            (currentLeague.currentUserTurnIndex + 1) %
            currentLeague.userTurnOrder.length;
        }

        currentLeague.save();

        Meteor.call('kickOffNomination', leagueId);
      } else {
        // Here the countdown are not 0 yet, so simply decrement the clock
        currentLeague.currentBidClock -= 1;
        currentLeague.save();
      }
    }, 1000);

    return true;
  },
});
