import { Meteor } from 'meteor/meteor';
import React, { createClass } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Leagues } from '../../api/collections';
import DraftStatusBanner from '../components/Draft/DraftStatusBanner';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoard from '../components/Draft/DraftBoard';
import DraftCurrentPlayer from '../components/Draft/DraftCurrentPlayer';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';

const Draft = createClass({
  handleBid() {
    Meteor.call( "bidOnPlayer",
                  this.props.currentLeague._id,
                  this.props.currentLeague.currentBids[this.props.currentLeague.currentBids.length - 1].value + 1,
                  Meteor.userId() );
  },
  render() {
    /*
    <Col xs={12} md={8} lg={8}>
      <DraftCurrentPlayer
        currentUser={this.props.currentUser}
        currentLeague={this.props.currentLeague}
      />
    </Col>
    */

    if(this.props.subsLoading) {
      return (
        <Grid fluid={true}>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <h3 className="text-center">
                Loading...
              </h3>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
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
            <DraftBoard
              currentLeagueUsers={this.props.currentLeagueUsers}
              currentLeague={this.props.currentLeague}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default createContainer( (props) => {
  let handle = Meteor.subscribe("league", props.params.leagueId);
  let usersHandle = Meteor.subscribe("usersInLeague", props.params.leagueId);

  return {
    subsLoading: !handle.ready(),
    currentUser: Meteor.user(),
    currentLeague: Leagues.findOne(),
    currentLeagueUsers: Meteor.users.find().fetch()
  };
}, Draft);
