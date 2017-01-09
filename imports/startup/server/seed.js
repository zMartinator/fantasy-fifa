import { Meteor } from 'meteor/meteor';
import { Leagues, Players } from '../../api/collections';
import importData from '../../utils/importData';

Meteor.startup( () => {
  if (Meteor.users.find().count() === 0) {
    var userId = Accounts.createUser({
      username: 'WALT',
      email: 'walt@walt.com',
      password: 'password'
    });

    var userId2 = Accounts.createUser({
      username: 'BEN',
      email: 'ben@ben.com',
      password: 'password'
    });

    console.log('Seeded users');
  }

  if(Leagues.find().count() === 0) {
    Leagues.insert({
      usersInLeague: [userId, userId2],
      leagueCreator: userId,

      name: 'Romeo Rumble',
      maxLeagueSize: 2,
      maxTeamSize: 3,
      auctionStartingMoney: 100,
      startTimeBetweenNomination: 10,
      startBidTime: 10,

      isDraftDone: null,
      userTurnOrder: [],
      currentUserTurnIndex: 0,
      currentBidClock: 0,
      currentNominationClock: 0,
      currentPlayerUpForBidId: '',
      currentBids:[],

      didNominateOnTime: false
    });

    console.log('Seeded leagues');
  }

  if(Players.find().count() === 0) {
    importData();

    console.log('Seeded players');
  }
});
