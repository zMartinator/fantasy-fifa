import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Players } from '../../api/collections';

const About = (props) => {
  if(props.loading) {
    return (
      <div>
        <h1 style={{
          color: 'red',
        }}>Loading..</h1>
      </div>
    );
  } else {
    console.log(props.players);
    return (
      <div>
        <h1 style={{
          color: 'green',
        }}>DONE LOADING</h1>
      </div>
    );
  }
};

export default createContainer(() => {
  let handle = Meteor.subscribe('players');

  return {
    loading: !handle.ready(),
    players: Players.find().fetch(),
    user: Meteor.user()
  };
}, About);
