import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { League } from '../../../api/collections';

class DraftStartButton extends Component {
  startDraft = () => {
    Meteor.call('startDraft', this.props.league._id);
  };

  render() {
    const { user, league } = this.props;
    return user && !league.hasDraftStarted && user._id === league.leagueCreator
      ? <Button
          bsSize="large"
          bsStyle="success"
          block
          onClick={this.startDraft}
        >
          Start Draft
        </Button>
      : null;
  }
}

export default createContainer(
  () => ({
    user: Meteor.user(),
    league: League.findOne(),
  }),
  DraftStartButton,
);
