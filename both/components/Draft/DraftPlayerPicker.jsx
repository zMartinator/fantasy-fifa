const {
  Row,
  Col,
  Button
} = bootstrap;

DraftPlayerPicker = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    let formPlayerName = React.findDOMNode(this.refs.playerName).value.trim();

    if (!formPlayerName) {
      return;
    }

    // Save to Server
    console.log(`Trying to Nominate: ${formPlayerName}`);
    //Meteor.call("nominatePlayer", formPlayerName);

    // RESET FORM
    React.findDOMNode(this.refs.playerName).value = "";

    return;
  },

  render() {
    if(!this.props.currentUser || !_.contains(this.props.currentLeague.usersInLeague, this.props.currentUser._id) ) {
      return null;
    }

    return (
      <form className="playerNameForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Player Name</label>
          <input type="text" id="playerName" ref="playerName" className="form-control" placeholder="e.g., Neymar" maxLength="30"/>
        </div>
        <button type="submit" className="btn btn-primary">Nominate!</button>
      </form>
    );
  }
});
