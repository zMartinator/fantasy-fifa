import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { League } from '../../api/collections';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoardUserItem from '../components/Draft/DraftBoardUserItem';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';

class Draft extends Component {
  handleBid = () => {
    const { league } = this.props;

    Meteor.call(
      'bidOnPlayer',
      league._id,
      league.currentBids[league.currentBids.length - 1].value + 1,
    );
  };

  render() {
    const { loading, league, user, leagueUsers } = this.props;

    return loading
      ? <h3 className="text-center">
          Loading...
        </h3>
      : <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p>
              {league.hasDraftStarted
                ? league.isDraftDone
                    ? 'Draft Done! We did it!'
                    : 'Draft Underway!'
                : 'Awaiting league creator to start'}
            </p>
            <DraftStartButton />
          </div>
          <DraftCurrentBid handleBid={this.handleBid} />
          <DraftPlayerPicker />
          <div>
            {leagueUsers.map(user => (
              <DraftBoardUserItem key={user._id} user={user} />
            ))}
          </div>
        </div>;
  }
}

export default createContainer(({ match }) => {
  const handle = Meteor.subscribe('league', match.params.leagueId);

  const loading = !handle.ready();
  const league = League.findOne();

  const user = Meteor.user();
  const leagueUsers = loading
    ? null
    : Meteor.users
        .find()
        .fetch()
        .filter(u => league.usersInLeague.includes(u._id));

  return {
    loading,
    user,
    league,
    leagueUsers,
  };
}, Draft);
