import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Select from 'react-select';
import { League, Player } from '../../../api/collections';

class DraftPlayerPicker extends Component {
  state = {
    player: undefined,
  };

  onSelectChange = value => {
    this.setState({
      player: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { player } = this.state;

    // Disable submitting nothing.
    if (!player) {
      return;
    }

    Meteor.call('nominatePlayer', player._id, League.findOne()._id);

    // Reset form
    this.setState({
      player: undefined,
    });
  };

  getOptions = (input, callback) => {
    Meteor.call('playerQuery', input, (err, players) => {
      players.forEach(player => {
        player.value = player._id;
        player.label = `${player.rating} - ${player.firstName} ${player.lastName}`;
      });
      console.log(players);
      callback(null, {
        options: players,
      });
    });
  };

  // renderOption = (option) => {
  //   return <div>option:{option.name}</div>;
  // }

  // renderValue = (option) => {
  //   return <div>value:{option.name}</div>;
  // }

  render() {
    const { league, user } = this.props;
    if (
      league.userTurnOrder.length === 0 ||
      user._id !== league.userTurnOrder[league.currentUserTurnIndex] ||
      league.currentPlayerUpForBidId !== ''
    ) {
      return null;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <Select.Async
          name="nominate-player"
          value={this.state.player}
          onChange={this.onSelectChange}
          autoload={false}
          cache={false}
          loadOptions={this.getOptions}
          // optionRenderer={this.renderOption}
          // valueRenderer={this.renderValue}
        />
        <button type="submit" className="btn btn-primary">Nominate!</button>
      </form>
    );
  }
}

export default createContainer(
  (...rest) => ({
    user: Meteor.user(),
    league: League.findOne(),
    ...rest,
  }),
  DraftPlayerPicker,
);
