import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import LeagueListContainer from '../components/Leagues/LeagueListContainer';
import LeagueCreationButton from '../components/Leagues/LeagueCreationButton';

const Home = (props) => (
  <Grid>
    <h1>Join A League!</h1>
    <LeagueListContainer currentUser={props.currentUser} />
    <LeagueCreationButton currentUser={props.currentUser} />
  </Grid>
);

export default createContainer( () => ({
  currentUser: Meteor.user(),
}), Home);
