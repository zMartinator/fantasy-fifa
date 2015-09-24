const {
  ListGroup,
  ListGroupItem
} = bootstrap;

LeagueListContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("leagues");

    return {
      leagueListLoading: !handle.ready(),
      leagueList: Leagues.find().fetch()
    };
  },
  render() {
    if(this.data.leagueListLoading) {
      return (
        <ListGroup>
          <ListGroupItem>
            Loading // TODO: Loading spinner
          </ListGroupItem>
        </ListGroup>
      );
    }

    return (
      <LeagueList currentUser={this.props.currentUser} leagues={this.data.leagueList}/>
    );
  }
});
