import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { League } from '../../api/collections';
import DraftStatusBanner from '../components/Draft/DraftStatusBanner';
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
      <Grid fluid={true}>
        <DraftStatusBanner isDone={this.props.currentLeague.isDraftDone} />
        <DraftStartButton
          currentUser={this.props.currentUser}
          currentLeague={this.props.currentLeague}
        />
        <Row>
          <Col xs={12} md={12} lg={12}>
            <DraftCurrentBid
              handleBidCallback={this.handleBid}
              currentUser={this.props.currentUser}
              currentLeague={this.props.currentLeague}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <DraftPlayerPicker
              currentUser={this.props.currentUser}
              currentLeague={this.props.currentLeague}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                  {this.props.currentLeagueUsers.map( (user) =>
                    <DraftBoardUserItem key={user._id} user={user} />
                  )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

};

export default createContainer( (props) => {
  console.log(props);
  let handle = Meteor.subscribe('league', props.params.leagueId);
  let usersHandle = Meteor.subscribe('usersInLeague', props.params.leagueId);

  return {
    subsLoading: !handle.ready(),
    currentUser: Meteor.user(),
    currentLeague: League.findOne(),
    currentLeagueUsers: Meteor.users.find().fetch()
  };
}, Draft);
