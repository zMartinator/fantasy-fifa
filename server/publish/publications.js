Meteor.publish("leagues", function() {
  return Leagues.find();
});
