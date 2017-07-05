import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { compose, withHandlers } from 'recompose';
import { League } from '../../../api/collections';

const DraftStartButton = ({ user, league, startDraft }) =>
  user && !league.hasDraftStarted && user._id === league.leagueCreator
    ? <Button bsSize="large" bsStyle="success" block onClick={startDraft}>
        Start Draft
      </Button>
    : null;

const enhanced = compose(
  withHandlers({
    startDraft: ({ league }) => e => Meteor.call('startDraft', league._id),
  })
)(DraftStartButton);

export default createContainer(
  () => ({
    user: Meteor.user(),
    league: League.findOne(),
  }),
  enhanced
);
