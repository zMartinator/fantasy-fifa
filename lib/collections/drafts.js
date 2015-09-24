Drafts = new Mongo.Collection("drafts");

Meteor.methods({
    "nominatePlayer": function(playerName, draftId) {
        check(playerName, String);
        check(draftId, String);

        if( !Meteor.userId() ) {
          throw new Meteor.Error("not-logged-in", "You must be logged in to nominate a player");
        }

        let currentDraft = Drafts.findOne(draftId);
        currentDraft.currentPlayerUpForBid = playerName;
        currentDraft.currentBids.push({ value: 1, userId: Meteor.userId() });
        currentDraft.currentBidClock = currentDraft.bidTime;
        // TODO: save

        // TODO: countdown stuff;

        return true;
    }
});
