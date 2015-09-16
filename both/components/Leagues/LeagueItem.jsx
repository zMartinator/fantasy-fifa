const {
  ListGroupItem,
  Row,
  Col,
  Button
} = bootstrap;


LeagueItem = React.createClass({

  handleJoinLeague() {
    console.log("attempting to join league");
  },
  render() {
    const league = this.props.leagueInfo;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <h4>{league.name}</h4>
          </Col>
          <Col xs={12} md={3} lg={2}>
            <p>{league.usersInLeague.length}/{league.maxSize} Spots</p>
            <p>Divisions: {league.isDivisions ? "Yes" : "No"}</p>
            <p>Number of games: {league.numberOfDivisionGames}</p>
          </Col>
          <Col xs={12} md={6} lg={8}>
            <LeagueJoinButton handleClick={this.handleJoinLeague} isLoggedIn={false} />
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});
