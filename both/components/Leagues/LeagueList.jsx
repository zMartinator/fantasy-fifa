const {
  ListGroup
} = bootstrap;


LeagueList = React.createClass({

  renderLeague(league) {
    return <LeagueItem currentUser={this.props.currentUser} leagueInfo={league} key={league._id} />;
  },
  render() {
    return (
      <ListGroup>
        {this.props.leagues.map(this.renderLeague)}
      </ListGroup>
    );
  }
});
