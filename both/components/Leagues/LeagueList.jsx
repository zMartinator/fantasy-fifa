const {
  ListGroup
} = bootstrap;


LeagueList = React.createClass({

  render() {
    return (
      <ListGroup>
        {this.props.leagues.map((league) => {
          return <LeagueItem currentUser={this.props.currentUser} leagueInfo={league} key={league._id} />;
        })}
      </ListGroup>
    );
  }
});
