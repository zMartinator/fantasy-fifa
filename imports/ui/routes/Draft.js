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
      this.props.currentLeague.currentBids[this.props.currentLeague.currentBids.length - 1].value + 1,
      Meteor.userId()
    );
  }

  render() {
    return this.props.subsLoading ? (
      <h3 className="text-center">
        Loading...
      </h3>
    ) : (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p>
            {this.props.currentLeague.isDraftDone ?
              'Draft Done! We did it!' :
              'Awaiting league creator to start'
            }
          </p>
          <DraftStartButton
            currentUser={this.props.currentUser}
            currentLeague={this.props.currentLeague}
          />
        </div>
        <DraftCurrentBid
          handleBidCallback={this.handleBid}
          currentUser={this.props.currentUser}
          currentLeague={this.props.currentLeague}
        />
        <DraftPlayerPicker
          currentUser={this.props.currentUser}
          currentLeague={this.props.currentLeague}
        />
        <div>
          {this.props.currentLeagueUsers.map( (user) =>
            <DraftBoardUserItem key={user._id} user={user} />
          )}
        </div>
      </div>
    );
  }

};

export default createContainer( (props) => {
  let handle = Meteor.subscribe('league', props.params.leagueId);
  let usersHandle = Meteor.subscribe('usersInLeague', props.params.leagueId);

  return {
    subsLoading: !handle.ready(),
    currentUser: Meteor.user(),
    currentLeague: League.findOne(),
    currentLeagueUsers: Meteor.users.find().fetch()
  };
}, Draft);
