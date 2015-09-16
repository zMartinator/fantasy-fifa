const {
  Button
} = bootstrap;


LeagueJoinButton = React.createClass({
  render() {
    if(this.props.isLoggedIn) {
      return (
        <Button bsSize="medium" bsStyle="primary" onClick={this.props.handleClick}>Join League</Button>
      );
    } else {
      return (
        <Button bsSize="medium" bsStyle="primary" disabled>Log In First</Button>
      );
    }
  }
});
