import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { League } from '../../api/collections';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoardUserItem from '../components/Draft/DraftBoardUserItem';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';

class Draft extends Component {
  constructor(props) {
    super(props);

    this.handleBid = this.handleBid.bind(this);
  }

  handleBid() {
    Meteor.call(
      'bidOnPlayer',
      this.props.currentLeague._id,
      this.props.currentLeague.currentBids[
        this.props.currentLeague.currentBids.length - 1
      ].value + 1,
    );
  }

  render() {
    const {
      loading,
      currentLeague,
      currentUser,
      currentLeagueUsers,
    } = this.props;

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
              {currentLeague.hasDraftStarted
                ? currentLeague.isDraftDone
                    ? 'Draft Done! We did it!'
                    : 'Draft Underway!'
                : 'Awaiting league creator to start'}
            </p>
            <DraftStartButton
              currentUser={currentUser}
              currentLeague={currentLeague}
            />
          </div>
          <DraftCurrentBid
            handleBidCallback={this.handleBid}
            currentUser={currentUser}
            currentLeague={currentLeague}
          />
          <DraftPlayerPicker
            currentUser={currentUser}
            currentLeague={currentLeague}
          />
          <div>
            {currentLeagueUsers.map(user => (
              <DraftBoardUserItem key={user._id} user={user} />
            ))}
          </div>
        </div>;
  }
}

export default createContainer(({ match }) => {
  const handle = Meteor.subscribe('league', match.params.leagueId);
  const usersHandle = Meteor.subscribe('usersInLeague', match.params.leagueId);

  const loading = !handle.ready() && !usersHandle.ready();
  const currentLeague = League.findOne();
  const currentUser = Meteor.user();
  const currentLeagueUsers = Meteor.users
    .find()
    .fetch()
    .filter(u => currentLeague.usersInLeague.includes(u._id));

  return {
    loading,
    currentUser,
    currentLeague,
    currentLeagueUsers,
  };
}, Draft);
