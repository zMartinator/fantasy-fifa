import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import LeagueJoinButton from './LeagueJoinButton';

class LeagueItem extends Component {
  handleJoinLeague = () => {
    const { league, user } = this.props;
    Meteor.call('registerUserForLeague', league._id, user._id);
  };

  render() {
    const { league, user } = this.props;

    const isAlreadyInLeague = user
      ? league.usersInLeague.includes(user._id)
      : false;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h4>
            <Link to={`/draft/${league._id}`}>
              {' '}{league.name}{' '}
            </Link>
          </h4>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: '0' }}>
            {league.usersInLeague.length}
            /
            {league.maxLeagueSize}
            {' '}
            Spots
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LeagueJoinButton
            handleClick={this.handleJoinLeague}
            isLoggedIn={user}
            isAlreadyInLeague={isAlreadyInLeague}
            isFull={league.usersInLeague.length === league.maxLeagueSize}
          />
        </div>
      </div>
    );
  }
}

export default createContainer(
  (...rest) => ({
    user: Meteor.user(),
    ...rest,
  }),
  LeagueItem,
);
