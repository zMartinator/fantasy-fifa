import React from 'react';
import { compose, withState } from 'recompose';
import PlayerPicker from '../components/PlayerPicker';
import Player from '../components/Player';

const Search = ({ playerId, changePlayerId }) => (
  <div>
    <h1>Search</h1>
    <PlayerPicker onPick={player => changePlayerId(player.id)} />
    <Player id={playerId} />
  </div>
);

export default compose(withState('playerId', 'changePlayerId'))(Search);
