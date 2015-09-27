const {
  Well
} = bootstrap;

DraftPlayerPicker = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    let formPlayerName = React.findDOMNode(this.refs.playerName).value.trim();

    if (!formPlayerName) {
      return;
    }

    // Save to Server
    Meteor.call("nominatePlayer", formPlayerName, Leagues.findOne()._id, Meteor.userId() );

    // RESET FORM
    React.findDOMNode(this.refs.playerName).value = "";

    return;
  },

  render() {
    // If logged in user is not in this league.
    if(!this.props.currentUser || !_.contains(this.props.currentLeague.usersInLeague, this.props.currentUser._id) ) {
      return null;
    }

    if(this.props.currentLeague.currentPlayerUpForBidId !== "") {
      return null;
    }

    // If currentUser is not the user who's turn it is to nominate.
    if(this.props.currentUser._id !== this.props.currentLeague.userTurnOrder[this.props.currentLeague.currentUserTurnIndex]) {
      return null;
    }

    return (
      <Well>
        <form className="playerNameForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="playerName">Player Name</label>
            <input type="text" id="playerName" ref="playerName" className="form-control" placeholder="e.g., Neymar" maxLength="30"/>
          </div>
          <button type="submit" className="btn btn-primary">Nominate!</button>
        </form>
      </Well>
    );
  }
});
