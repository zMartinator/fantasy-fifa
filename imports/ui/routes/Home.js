import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import LeagueListContainer from '../components/Leagues/LeagueListContainer';
import LeagueCreationButton from '../components/Leagues/LeagueCreationButton';

const Home = (props) => (
  <div>
    <h1>Join A League!</h1>
    <LeagueListContainer currentUser={props.currentUser} />
    <LeagueCreationButton currentUser={props.currentUser} />
  </div>
);

export default createContainer( () => ({
  currentUser: Meteor.user(),
}), Home);
