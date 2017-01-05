import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Players } from '../../api/collections';

const About = () => (
  <div className='About'>
    <h1>About</h1>
  </div>
);

export default createContainer(() => {
  let handle = Meteor.subscribe("players");

  return {
    loading: !handle.ready(),
    players: Players.find().fetch(),
    currentUser: Meteor.user()
  };
}, About);
