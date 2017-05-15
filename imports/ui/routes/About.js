import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Player as Players } from '../../api/collections';
import Player from '../components/Player/Player';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';

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
        <DraftPlayerPicker />
        {/*players.map(player => <Player key={player._id} player={player} />)*/}
      </div>;

export default createContainer(() => {
  const handle = Meteor.subscribe('onePlayer');

  return {
    loading: !handle.ready(),
    players: Players.find().fetch(),
    user: Meteor.user(),
  };
}, About);
