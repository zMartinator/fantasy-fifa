import React from 'react';
import { Button } from 'react-bootstrap';

const maxBid = (moneyLeft, currentAmountOfPlayers, maxTeamSize) =>
  moneyLeft - (maxTeamSize - currentAmountOfPlayers - 1);

const DraftCurrentBidButton = props => {
  if (!props.currentUser) {
    return (
      <Button bsStyle="warning" block disabled>You Must Log In First</Button>
    );
  }

  if (!props.currentLeague.usersInLeague.includes(props.currentUser._id)) {
    return (
      <Button bsStyle="warning" block disabled>
        You are not in this draft!
      </Button>
    );
  }

  if (props.currentLeague.isDraftDone === true) {
    return <Button bsStyle="success" block disabled>Draft Over</Button>;
  }

  if (props.currentBid.userId === props.currentUser._id) {
    return (
      <Button bsStyle="success" block disabled>You are highest bidder</Button>
    );
  }

  if (
    props.currentUser.profile.team.players.length ===
    props.currentLeague.maxTeamSize
  ) {
    return <Button bsStyle="success" block disabled>Your Team is Full</Button>;
  }

  if (
    props.currentBid.value >=
    maxBid(
      props.currentUser.profile.draftMoney,
      props.currentUser.profile.team.players.length,
      props.currentLeague.maxTeamSize,
    )
  ) {
    return <Button bsStyle="warning" block disabled>Above your max bid</Button>;
  }

  if (props.currentLeague.currentPlayerUpForBidId !== '') {
    return (
      <Button bsStyle="primary" block onClick={props.handleBidCallback}>
        Bid {props.currentBid.value + 1}
      </Button>
    );
  }

  return null;
};

export default DraftCurrentBidButton;
