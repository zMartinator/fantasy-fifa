import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { League } from '../../../api/collections';

class DraftPlayerPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
    };

    this.changePlayerName = this.changePlayerName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changePlayerName(event) {
    this.setState({
      playerName: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.state.playerName.trim().length === 0) {
      return;
    }

    Meteor.call(
      'nominatePlayer',
      this.state.playerName.trim(),
      League.findOne()._id,
      Meteor.userId(),
    );

    // Reset form
    this.setState({
      playerName: '',
    });
  }

  render() {
    if (
      this.props.currentLeague.userTurnOrder.length === 0 ||
      this.props.currentUser._id !==
        this.props.currentLeague.userTurnOrder[
          this.props.currentLeague.currentUserTurnIndex
        ] ||
      this.props.currentLeague.currentPlayerUpForBidId !== ''
    ) {
      return null;
    }

    return (
      <form className="playerNameForm" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Player Name</label>
          <input
            type="text"
            id="playerName"
            className="form-control"
            value={this.state.playerName}
            onChange={this.changePlayerName}
          />
        </div>
        <button type="submit" className="btn btn-primary">Nominate!</button>
      </form>
    );
  }
}

export default DraftPlayerPicker;
