import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DraftStartButton extends Component {
  constructor(props) {
    super(props);

    this.startDraft = this.startDraft.bind(this);
  }

  startDraft() {
    Meteor.call('startDraft', this.props.currentLeague._id);
  }

  render() {
    if (!this.props.currentUser) {
      return null;
    }

    if (
      !this.props.currentLeague.hasDraftStarted &&
      this.props.currentUser._id === this.props.currentLeague.leagueCreator
    ) {
      return (
        <Button
          bsSize="large"
          bsStyle="success"
          block
          onClick={this.startDraft}
        >
          Start Draft
        </Button>
      );
    }

    return null;
  }
}

export default DraftStartButton;
