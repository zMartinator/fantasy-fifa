import React from 'react';
import { Button } from 'react-bootstrap';

const LeagueJoinButton = ({
  isAlreadyInLeague,
  isFull,
  isLoggedIn,
  handleClick,
}) => {
  if (isAlreadyInLeague) {
    return (
      <Button bsStyle="success" disabled>
        Joined!
      </Button>
    );
  } else if (isFull) {
    return (
      <Button bsStyle="warning" disabled>
        Already Full
      </Button>
    );
  } else if (isLoggedIn) {
    return (
      <Button bsStyle="primary" onClick={handleClick}>
        Join League
      </Button>
    );
  } else {
    return (
      <Button bsStyle="primary" disabled>
        Log In First
      </Button>
    );
  }
};

export default LeagueJoinButton;
