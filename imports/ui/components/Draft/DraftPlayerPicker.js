import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Select from 'react-select';
import { compose, withState, withHandlers } from 'recompose';
import { League, Player } from '../../../api/collections';

const loadOptions = (input, callback) => {
  Meteor.call('playerQuery', input, (err, players) => {
    players.forEach(player => {
      player.value = player._id;
      player.label = `${player.rating} - ${player.firstName} ${player.lastName}`;
    });
    // console.log(players);
    callback(null, {
      options: players,
    });
  });
};

const Picker = ({ league, user, player, onPlayerChange, onSubmit }) =>
  league.userTurnOrder.length === 0 ||
    user._id !== league.userTurnOrder[league.currentUserTurnIndex] ||
    league.currentPlayerUpForBidId !== ''
    ? null
    : <form onSubmit={onSubmit}>
        <Select.Async
          name="nominate-player"
          value={player}
          onChange={onPlayerChange}
          autoload={false}
          cache={false}
          loadOptions={loadOptions}
        />
        <button type="submit" className="btn btn-primary">Nominate!</button>
      </form>;

const EnhancedPicker = compose(
  withState('player', 'onPlayerChange'),
  withHandlers({
    onSubmit: ({ player, onPlayerChange }) => event => {
      event.preventDefault();

      // Disable submitting nothing.
      if (!player) {
        return;
      }

      Meteor.call('nominatePlayer', player._id, League.findOne()._id);

      // Reset form
      onPlayerChange(undefined);
    },
  }),
)(Picker);

export default createContainer(
  (...rest) => ({
    user: Meteor.user(),
    league: League.findOne(),
    ...rest,
  }),
  EnhancedPicker,
);
