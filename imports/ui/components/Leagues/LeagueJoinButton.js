import React, { createClass } from 'react';
import { Button } from 'react-bootstrap';

const LeagueJoinButton = createClass({
  render() {
    if(this.props.isAlreadyInLeague) {
      return (
        <Button bsStyle="success" disabled>Joined!</Button>
      );
    }
    if(this.props.isFull) {
      return (
        <Button bsStyle="warning" disabled>Already Full</Button>
      );
    }
    if(this.props.isLoggedIn) {
      return (
        <Button bsStyle="primary" onClick={this.props.handleClick}>Join League</Button>
      );
    } else {
      return (
        <Button bsStyle="primary" disabled >Log In First</Button>
      );
    }
  }
});

export default LeagueJoinButton;
