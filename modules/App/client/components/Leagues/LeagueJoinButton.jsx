import { createClass } from 'react';
import { Button } from 'react-bootstrap';

const LeagueJoinButton = createClass({
  render() {
    if(this.props.isAlreadyInLeague) {
      return (
        <Button bsSize="medium" bsStyle="success" disabled>Joined!</Button>
      );
    }
    if(this.props.isFull) {
      return (
        <Button bsSize="medium" bsStyle="warning" disabled>Already Full</Button>
      );
    }
    if(this.props.isLoggedIn) {
      return (
        <Button bsSize="medium" bsStyle="primary" onClick={this.props.handleClick}>Join League</Button>
      );
    } else {
      return (
        <Button bsSize="medium" bsStyle="primary" disabled >Log In First</Button>
      );
    }
  }
});

export default LeagueJoinButton;
