import { createClass } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import LeagueListContainer from 'App/client/components/Leagues/LeagueListContainer';
import LeagueCreationButton from 'App/client/components/Leagues/LeagueCreationButton';

const Home = createClass({
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

export default Home;
