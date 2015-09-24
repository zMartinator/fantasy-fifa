const {
  Grid,
  Row,
  Col
} = bootstrap;


Home = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  render() {
    return (
      <Grid>
        <h1>Join A League!</h1>
        <LeagueListContainer currentUser={this.data.currentUser} />
        <LeagueCreationButton currentUser={this.data.currentUser} />
      </Grid>
    );
  }
});
