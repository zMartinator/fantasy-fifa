import React from 'react';
import { Button } from 'react-bootstrap';
import maxBid from '../../../utils/maxBid';

const DraftCurrentBidButton = ({
  currentUser,
  currentLeague,
  currentBid,
  handleBidCallback,
}) => {
  if (!currentUser) {
    return (
      <Button bsStyle="warning" block disabled>You Must Log In First</Button>
    );
  }

  if (!currentLeague.usersInLeague.includes(currentUser._id)) {
    return (
      <Button bsStyle="warning" block disabled>
        You are not in this draft!
      </Button>
    );
  }

  if (currentLeague.isDraftDone === true) {
    return <Button bsStyle="success" block disabled>Draft Over</Button>;
  }

  if (currentBid.userId === currentUser._id) {
    return (
      <Button bsStyle="success" block disabled>You are highest bidder</Button>
    );
  }

  if (currentUser.profile.team.players.length === currentLeague.maxTeamSize) {
    return <Button bsStyle="success" block disabled>Your Team is Full</Button>;
  }

  if (currentBid.value >= maxBid(currentUser, currentLeague)) {
    return <Button bsStyle="warning" block disabled>Above your max bid</Button>;
  }

  if (currentLeague.currentPlayerUpForBidId !== '') {
    return (
      <Button bsStyle="primary" block onClick={handleBidCallback}>
        Bid {currentBid.value + 1}
      </Button>
    );
  }

  return null;
};

export default DraftCurrentBidButton;
