import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import DraftCurrentBidButton from './DraftCurrentBidButton';
import Player from '../Player/Player';
import { League } from '../../../api/collections';

const DraftCurrentBid = ({ league, user, handleBid }) => {
  const currentBid =
    league.currentBids.length > 0
      ? league.currentBids[league.currentBids.length - 1]
      : {
          value: -1,
          userId: '',
          username: '',
        };

  return (
    <div>
      <h2>
        {league.currentNominationClock === 0
          ? league.currentBidClock
          : league.currentNominationClock}
      </h2>
      <Player id={league.currentPlayerUpForBidId} />
      {league.currentBidClock !== 0 &&
        <h4>
          for {currentBid.value} by {currentBid.username}
        </h4>}
      <DraftCurrentBidButton bid={currentBid} handleBid={handleBid} />
    </div>
  );
};

export default createContainer(
  () => ({
    user: Meteor.user(),
    league: League.findOne(),
  }),
  DraftCurrentBid
);
