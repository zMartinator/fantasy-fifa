import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Player, League } from './collections';

Meteor.publish('leagues', function() {
  return League.find();
});

Meteor.publish('league', function(leagueId) {
  check(leagueId, String);
  return League.find(leagueId);
});

Meteor.publish('usersInLeague', function(leagueId) {
  check(leagueId, String);
  const currentLeague = League.findOne(leagueId);
  if (currentLeague) {
    const userIds = currentLeague.usersInLeague;

    return Meteor.users.find({ _id: { $in: userIds } });
  }

  return Meteor.users.find();
});

Meteor.publish('players', function() {
  return Player.find();
});

Meteor.publish('onePlayer', function() {
  const player = {
    _id: 'CKNyXefAsAMZLKppL',
    commonName: 'Cristiano Ronaldo',
    firstName: 'C. Ronaldo',
    headshotImgUrl: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/players/html5/120x120/20801.png',
    lastName: 'dos Santos Aveiro',
    league: {
      abbrName: 'ESP 1',
      id: 53,
      imgUrl: null,
      name: 'LaLiga Santander',
    },
    nation: {
      imageUrls: {
        small: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/flags/html5/24x14/38.png',
        medium: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/flags/html5/35x22/38.png',
        large: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/flags/html5/45x28/38.png',
      },
      abbrName: 'Portugal',
      id: 38,
      imgUrl: null,
      name: 'Portugal',
    },
    club: {
      imageUrls: {
        dark: {
          small: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…6A-A20F88B05418/2017/fut/items/images/clubbadges/html5/dark/24x24/l243.png',
          medium: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…6A-A20F88B05418/2017/fut/items/images/clubbadges/html5/dark/35x35/l243.png',
          large: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…6A-A20F88B05418/2017/fut/items/images/clubbadges/html5/dark/45x45/l243.png',
        },
        normal: {
          small: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…-A20F88B05418/2017/fut/items/images/clubbadges/html5/normal/24x24/l243.png',
          medium: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…-A20F88B05418/2017/fut/items/images/clubbadges/html5/normal/35x35/l243.png',
          large: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842…-A20F88B05418/2017/fut/items/images/clubbadges/html5/normal/45x45/l243.png',
        },
      },
      abbrName: 'R. Madrid',
      id: 243,
      imgUrl: null,
      name: 'Real Madrid',
    },
    headshot: {
      largeImgUrl: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/players/html5/120x120/20801.png',
      medImgUrl: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/players/html5/92x92/20801.png',
      smallImgUrl: 'https://fifa17.content.easports.com/fifa/fltOnlineAssets/CC8267B6-0817-4842-BB6A-A20F88B05418/2017/fut/items/images/players/html5/40x40/20801.png',
    },
    specialImages: {
      largeTOTWImgUrl: null,
      medTOTWImgUrl: null,
    },
    position: 'LW',
    playStyle: 'Basic',
    playStyleId: null,
    height: 185,
    weight: 80,
    birthdate: '1985-02-05',
    age: 31,
    acceleration: 91,
    aggression: 63,
    agility: 90,
    balance: 63,
    ballcontrol: 92,
    foot: 'Right',
    skillMoves: 5,
    crossing: 84,
    curve: 81,
    dribbling: 93,
    finishing: 93,
    freekickaccuracy: 77,
    gkdiving: 7,
    gkhandling: 11,
    gkkicking: 15,
    gkpositioning: 14,
    gkreflexes: 11,
    headingaccuracy: 87,
    interceptions: 29,
    jumping: 95,
    longpassing: 72,
    longshots: 92,
    marking: 22,
    penalties: 85,
    positioning: 94,
    potential: 94,
    reactions: 96,
    shortpassing: 82,
    shotpower: 94,
    slidingtackle: 23,
    sprintspeed: 92,
    standingtackle: 31,
    stamina: 92,
    strength: 80,
    vision: 85,
    volleys: 88,
    weakFoot: 4,
    traits: [
      'Takes Powerful Driven Free Kicks',
      'Flair',
      'Shooting - Long Shot Taker',
      'Dribbler - Speed Dribbler',
    ],
    specialities: [
      'Speedster',
      'Dribbler',
      'Distance Shooter',
      'Acrobat',
      'Clinical Finisher',
      'Complete Forward',
      'Poacher',
    ],
    atkWorkRate: 'High',
    defWorkRate: 'Low',
    playerType: 'rare',
    attributes: [
      {
        name: 'fut.attribute.PAC',
        value: 92,
        chemistryBonus: [0],
      },
      {
        name: 'fut.attribute.SHO',
        value: 92,
        chemistryBonus: [0],
      },
      {
        name: 'fut.attribute.PAS',
        value: 81,
        chemistryBonus: [0],
      },
      {
        name: 'fut.attribute.DRI',
        value: 91,
        chemistryBonus: [0],
      },
      {
        name: 'fut.attribute.DEF',
        value: 33,
        chemistryBonus: [0],
      },
      {
        name: 'fut.attribute.PHY',
        value: 80,
        chemistryBonus: [0],
      },
    ],
    name: 'Cristiano Ronaldo',
    quality: 'gold',
    color: 'rare_gold',
    isGK: false,
    positionFull: 'Left Wing',
    isSpecialType: false,
    contracts: null,
    fitness: null,
    rawAttributeChemistryBonus: null,
    isLoan: null,
    squadPosition: null,
    itemType: 'player',
    discardValue: null,
    id: '20801',
    modelName: 'FUTPlayerItem',
    baseId: 20801,
    rating: 94,
  };
  return Player.find({}, { limit: 1 });
});
