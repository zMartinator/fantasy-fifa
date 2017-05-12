import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Players } from '../../api/collections';
import Player from '../components/Player/Player';

const About = ({ loading, players }) =>
  loading
    ? <div>
        <h1
          style={{
            color: 'red',
          }}
        >
          Loading..
        </h1>
      </div>
    : <div>
        {players.map(player => <Player key={player._id} player={player} />)}
      </div>;

export default createContainer(() => {
  const handle = Meteor.subscribe('onePlayer');

  return {
    loading: !handle.ready(),
    players: Players.find().fetch(),
    user: Meteor.user(),
  };
}, About);
