Meteor.publish("leagues", function() {
  return Leagues.find();
});

Meteor.publish("league", function(leagueId) {
  check(leagueId, String);
  return Leagues.find(leagueId);
});

Meteor.publish("usersInLeague", function(leagueId) {
  check(leagueId, String);
  var currentLeague = Leagues.findOne(leagueId);
  if(currentLeague) {
    var userIds = currentLeague.usersInLeague;

    return Meteor.users.find({_id: {$in: userIds}});
  }

  return Meteor.users.find();
});
