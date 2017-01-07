import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Leagues } from '../../api/collections';
import DraftStatusBanner from '../components/Draft/DraftStatusBanner';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoardUserItem from '../components/Draft/DraftBoardUserItem';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';

const handleBid = (leagueId, value) =>
  () => Meteor.call( 'bidOnPlayer', leagueId, value, Meteor.userId() );

const Draft = (props) => {
  const partialHandleBid = handleBid(
    props.currentLeaugue._id,
    props.currentLeague.currentBids[props.currentLeague.currentBids.length - 1].value + 1
  );

  return props.subsLoading ? (
    <h3 className="text-center">
      Loading...
    </h3>
  ) : (
    <Grid fluid={true}>
      <DraftStatusBanner isDone={props.currentLeague.isDraftDone} />
      <DraftStartButton
        currentUser={props.currentUser}
        currentLeague={props.currentLeague}
      />
      <Row>
        <Col xs={12} md={12} lg={12}>
          <DraftCurrentBid
            handleBidCallback={partialHandleBid}
            currentUser={props.currentUser}
            currentLeague={props.currentLeague}
          />
        </Col>
        <Col xs={12} md={12} lg={12}>
          <DraftPlayerPicker
            currentUser={props.currentUser}
            currentLeague={props.currentLeague}
          />
        </Col>
        <Col xs={12} md={12} lg={12}>
          <Row>
            <Col xs={12} md={12} lg={12}>
                {props.currentLeagueUsers.map( (user) =>
                  <DraftBoardUserItem key={user._id} user={user} />
                )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};

export default createContainer( (props) => {
  let handle = Meteor.subscribe('league', props.params.leagueId);
  let usersHandle = Meteor.subscribe('usersInLeague', props.params.leagueId);

  return {
    subsLoading: !handle.ready(),
    currentUser: Meteor.user(),
    currentLeague: Leagues.findOne(),
    currentLeagueUsers: Meteor.users.find().fetch()
  };
}, Draft);
