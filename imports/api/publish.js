import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Players, Leagues } from './collections';

Meteor.publish('leagues', function() {
  return Leagues.find();
});

Meteor.publish('league', function(leagueId) {
  check(leagueId, String);
  return Leagues.find(leagueId);
});

Meteor.publish('usersInLeague', function(leagueId) {
  check(leagueId, String);
  var currentLeague = Leagues.findOne(leagueId);
  if(currentLeague) {
    var userIds = currentLeague.usersInLeague;

    return Meteor.users.find({_id: {$in: userIds}});
  }

  return Meteor.users.find();
});

Meteor.publish('players', function() {
  return Players.find();
});
