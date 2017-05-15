import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { League, Player } from '../../api/collections';
import importData from '../../utils/importData';

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    const userId = Accounts.createUser({
      username: 'WALT',
      email: 'walt@walt.com',
      password: 'password',
      profile: {
        team: {
          name: 'teamName',
          players: [],
        },
        draftMoney: 100,
      },
    });

    const userId2 = Accounts.createUser({
      username: 'BEN',
      email: 'ben@ben.com',
      password: 'password',
      profile: {
        team: {
          name: 'teamName',
          players: [],
        },
        draftMoney: 100,
      },
    });

    console.log('Seeded users');

    if (League.find().count() === 0) {
      const league = new League({
        usersInLeague: [userId, userId2],
        leagueCreator: userId,

        name: 'Romeo Rumble',
        maxLeagueSize: 2,
        maxTeamSize: 3,
        auctionStartingMoney: 100,
        startTimeBetweenNomination: 10,
        startBidTime: 10,

        isDraftDone: false,
        hasDraftStarted: false,
        userTurnOrder: [],
        currentUserTurnIndex: 0,
        currentBidClock: 0,
        currentNominationClock: 0,
        currentPlayerUpForBidId: '',
        currentBids: [],

        didNominateOnTime: false,
        playersDrafted: [],
      });
      league.save();

      console.log('Seeded leagues');
    }
  }

  if (Player.find().count() === 0) {
    importData();

    console.log('Seeded players');
  }
});
