Meteor.publish("draft", function(draftId) {
  check(draftId, String);
  return Drafts.find(draftId);
});


Meteor.publish("draftAndLeagueByDraftId", function(draftId) {
  check(draftId, String);
  return [
    Drafts.find(draftId),
    Leagues.find({draftId: draftId})
  ];
});
