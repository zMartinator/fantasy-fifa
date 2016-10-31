import React, { createClass } from 'react';
import { Button } from 'react-bootstrap';

const DraftCurrentBidButton = createClass({

  maxBid(moneyLeft, currentAmountOfPlayers, maxTeamSize) {
    return moneyLeft - (maxTeamSize - currentAmountOfPlayers - 1);
  },

  render() {

    if(!this.props.currentUser) {
      return (
        <Button bsStyle="warning" block disabled >
          You Must Log In First
        </Button>
      );
    }

    if( !_.contains(this.props.currentLeague.usersInLeague, this.props.currentUser._id) ) {
      return (
        <Button bsStyle="warning" block disabled >
          You are not in this draft!
        </Button>
      );
    }

    if(this.props.currentLeague.isDraftDone === null) {
      return (
        <Button bsStyle="success" block disabled >
          Awaiting Draft to Start
        </Button>
      );
    }

    if(this.props.currentLeague.isDraftDone === true) {
      return (
        <Button bsStyle="success" block disabled >
          Draft Over
        </Button>
      );
    }

    if(this.props.currentBid.userId === this.props.currentUser._id) {
      return (
        <Button bsStyle="success" block disabled >
          You are highest bidder
        </Button>
      );
    }

    if(this.props.currentUser.profile.team.players.length === this.props.currentLeague.maxTeamSize) {
      return (
        <Button bsStyle="success" block disabled >
          Your Team is Full
        </Button>
      );
    }

    if( this.props.currentBid.value >= this.maxBid(this.props.currentUser.profile.draftMoney, this.props.currentUser.profile.team.players.length, this.props.currentLeague.maxTeamSize) ) {
      return (
        <Button bsStyle="primary" block  disabled >
          Above your max bid
        </Button>
      );
    }

    if(this.props.currentLeague.currentPlayerUpForBidId !== "") {
      return (
        <Button bsStyle="primary" block onClick={this.props.handleBidCallback}>
          Bid {this.props.currentBid.value + 1}
        </Button>
      );
    }

    return null;
  }
});

export default DraftCurrentBidButton;
