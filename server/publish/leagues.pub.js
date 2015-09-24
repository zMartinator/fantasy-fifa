Meteor.publish("leagues", function() {
  return Leagues.find();
});

Meteor.publish("league", function(leagueId) {
  check(leagueId, String);
  return Leagues.find(leagueId);
});
