import React from 'react';
import { Button } from 'react-bootstrap';

const LeagueJoinButton = props => {
  if (props.isAlreadyInLeague) {
    return <Button bsStyle="success" disabled>Joined!</Button>;
  } else if (props.isFull) {
    return <Button bsStyle="warning" disabled>Already Full</Button>;
  } else if (props.isLoggedIn) {
    return (
      <Button bsStyle="primary" onClick={props.handleClick}>Join League</Button>
    );
  } else {
    return <Button bsStyle="primary" disabled>Log In First</Button>;
  }
};

export default LeagueJoinButton;
