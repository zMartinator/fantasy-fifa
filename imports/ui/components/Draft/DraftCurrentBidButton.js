import React from 'react';
import { Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { League } from '../../../api/collections';
import maxBid from '../../../utils/maxBid';

const DraftCurrentBidButton = ({ user, league, bid, handleBid }) => {
  if (!user) {
    return (
      <Button bsStyle="warning" block disabled>
        You Must Log In First
      </Button>
    );
  }

  if (!league.usersInLeague.includes(user._id)) {
    return (
      <Button bsStyle="warning" block disabled>
        You are not in this draft!
      </Button>
    );
  }

  if (league.isDraftDone === true) {
    return (
      <Button bsStyle="success" block disabled>
        Draft Over
      </Button>
    );
  }

  if (bid.userId === user._id) {
    return (
      <Button bsStyle="success" block disabled>
        You are highest bidder
      </Button>
    );
  }

  if (user.profile.team.players.length === league.maxTeamSize) {
    return (
      <Button bsStyle="success" block disabled>
        Your Team is Full
      </Button>
    );
  }

  if (bid.value >= maxBid(user, league)) {
    return (
      <Button bsStyle="warning" block disabled>
        Above your max bid
      </Button>
    );
  }

  if (league.currentPlayerUpForBidId !== '') {
    return (
      <Button bsStyle="primary" block onClick={handleBid}>
        Bid {bid.value + 1}
      </Button>
    );
  }

  return null;
};

export default createContainer(
  (...rest) => ({
    user: Meteor.user(),
    league: League.findOne(),
    ...rest,
  }),
  DraftCurrentBidButton
);
