import { Meteor } from 'meteor/meteor';
import React, { createClass } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import LeagueListContainer from '../components/Leagues/LeagueListContainer';
import LeagueCreationButton from '../components/Leagues/LeagueCreationButton';

const Home = createClass({
  render() {
    return (
      <Grid>
        <h1>Join A League!</h1>
        <LeagueListContainer currentUser={this.props.currentUser} />
        <LeagueCreationButton currentUser={this.props.currentUser} />
      </Grid>
    );
  }
});

export default createContainer( () => {
  return {
    currentUser: Meteor.user(),
  };
}, Home);
