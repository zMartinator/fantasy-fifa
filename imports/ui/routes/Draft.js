import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { League } from '../../api/collections';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoardUserItem from '../components/Draft/DraftBoardUserItem';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';
import spinnerWhileLoading from '../components/Spinner';
import { compose, withHandlers } from 'recompose';

const Draft = ({ league, user, leagueUsers, handleBid }) =>
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>
        {league.hasDraftStarted
          ? league.isDraftDone ? 'Draft Done! We did it!' : 'Draft Underway!'
          : 'Awaiting league creator to start'}
      </p>
      <DraftStartButton />
    </div>
    <DraftCurrentBid handleBid={handleBid} />
    <DraftPlayerPicker />
    <div>
      {leagueUsers.map(user =>
        <DraftBoardUserItem key={user._id} user={user} />
      )}
    </div>
  </div>;

const enhanced = compose(
  withHandlers({
    handleBid: ({ league }) => e =>
      Meteor.call(
        'bidOnPlayer',
        league._id,
        league.currentBids[league.currentBids.length - 1].value + 1
      ),
  }),
  spinnerWhileLoading(({ isLoading }) => isLoading)
)(Draft);

export default createContainer(({ match }) => {
  const handle = Meteor.subscribe('league', match.params.leagueId);

  const isLoading = !handle.ready();
  const league = League.findOne();

  const user = Meteor.user();
  const leagueUsers = isLoading
    ? null
    : Meteor.users
        .find()
        .fetch()
        .filter(u => league.usersInLeague.includes(u._id));

  return {
    isLoading,
    user,
    league,
    leagueUsers,
  };
}, enhanced);
