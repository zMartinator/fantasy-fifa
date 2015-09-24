const {
  Button
} = bootstrap;

DraftCurrentBidButton = React.createClass({

  // TestCase: currently have 10 ppl, maxSize is 15, need 5 more. bidding on 11th player. currently have $50. must have $4 leftover
  maxBid(moneyLeft, currentAmountOfPlayers, maxTeamSize) {
    return moneyLeft - (maxTeamSize - currentAmountOfPlayers - 1);
  },

  render() {
    var currentBid = this.props.currentDraft.currentBids.length > 0 ? this.props.currentDraft.currentBids[this.props.currentDraft.currentBids.length - 1].value : 1;
    var currentPlayerUpForBid = this.props.currentDraft.currentPlayerUpForBidId !== -1 ? this.props.currentDraft.currentPlayerUpForBidId : "Waiting";
    var currentUser = this.props.currentUser; // TODO: refactor this shortcut
    var currentDraft = this.props.currentDraft; // TODO: refactor this shortcut

    if(!currentUser) {
      return (
        <Button bsSize="medium" bsStyle="warning" block disabled >
          You Must Log In First
        </Button>
      );
    }

    if( !_.contains(this.props.currentLeague.usersInLeague, currentUser._id) ) {
      return (
        <Button bsSize="medium" bsStyle="warning" block disabled >
          You are not in this draft!
        </Button>
      );
    }

    if(currentDraft.isDone == null) {
      return (
        <Button bsSize="medium" bsStyle="success" block disabled >
          Awaiting Draft to Start
        </Button>
      );
    }

    if(currentDraft.isDone == null) {
      return (
        <Button bsSize="medium" bsStyle="success" block disabled >
          Draft Over
        </Button>
      );
    }

    if(currentBid.userId == currentUser._id) {
      return (
        <Button bsSize="medium" bsStyle="success" block disabled >
          You are highest bidder
        </Button>
      );
    }

    if( currentBid.value > this.maxBid(currentUser.MoneyLeft, currentUser.profile.team.players.length, currentDraft) ) {
      return (
        <Button bsSize="medium" bsStyle="primary" block  disabled >
          Above your max bid
        </Button>
      );
    }

    return (
      <Button bsSize="medium" bsStyle="primary" block onClick={this.props.handleBidCallback}>
        {currentBid}
      </Button>
    );
  }
});
