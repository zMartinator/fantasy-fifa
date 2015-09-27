const {
  ListGroupItem,
  Row,
  Col,
  Button
} = bootstrap;


LeagueItem = React.createClass({

  handleJoinLeague() {
    Meteor.call("registerUserForLeague",
                this.props.leagueInfo._id,
                this.props.currentUser._id
    );
  },
  render() {

    let isAlreadyInLeague = false;
    if(this.props.currentUser) {
      isAlreadyInLeague = _.contains(this.props.leagueInfo.usersInLeague, this.props.currentUser._id);
    }

    return (
      <ListGroupItem>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <h4><a href={"/draft/" + this.props.leagueInfo._id}> {this.props.leagueInfo.name} </a></h4>
          </Col>
          <Col xs={12} md={3} lg={2}>
            <p>{this.props.leagueInfo.usersInLeague.length}/{this.props.leagueInfo.maxLeagueSize} Spots</p>
          </Col>
          <Col xs={12} md={6} lg={8}>
            <LeagueJoinButton
              handleClick={this.handleJoinLeague}
              isLoggedIn={this.props.currentUser}
              isAlreadyInLeague={isAlreadyInLeague}
              isFull={this.props.leagueInfo.usersInLeague.length === this.props.leagueInfo.maxSize} />
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});
