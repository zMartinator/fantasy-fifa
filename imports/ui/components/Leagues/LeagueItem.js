import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { compose, withHandlers } from 'recompose';
import LeagueJoinButton from './LeagueJoinButton';

const LeagueItem = ({ league, user, joinLeague }) => (
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
        handleClick={joinLeague}
        isLoggedIn={user}
        isAlreadyInLeague={user && league.usersInLeague.includes(user._id)}
        isFull={league.usersInLeague.length === league.maxLeagueSize}
      />
    </div>
  </div>
);

const enhanced = compose(
  withHandlers({
    joinLeague: ({ league, user }) => e =>
      Meteor.call('registerUserForLeague', league._id, user._id),
  }),
)(LeagueItem);

export default createContainer(
  (...rest) => ({
    user: Meteor.user(),
    ...rest,
  }),
  enhanced,
);
