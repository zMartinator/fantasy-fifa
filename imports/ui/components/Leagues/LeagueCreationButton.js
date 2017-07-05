import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { compose, withState, withHandlers } from 'recompose';
import LeagueCreationForm from './LeagueCreationForm';

const modalStyles = {
  // content: {
  //   top: '50%',
  //   left: '50%',
  //   right: 'auto',
  //   bottom: 'auto',
  //   marginRight: '-50%',
  //   transform: 'translate(-50%, -50%)',
  // },
};

const LeagueCreationButton = ({ user, show, toggleShow }) =>
  user
    ? <div>
        <Button bsStyle="primary" bsSize="large" onClick={toggleShow}>
          Create League
        </Button>

        <Modal
          isOpen={show}
          contentLabel="Leage Creation Modal"
          style={modalStyles}
        >
          <h1>Create League</h1>
          <LeagueCreationForm done={toggleShow} />
        </Modal>
      </div>
    : <Button bsStyle="default" bsSize="large" disabled>
        Login to Create
      </Button>;

const enhanced = compose(
  withState('show', 'changeShow', false),
  withHandlers({
    toggleShow: ({ show, changeShow }) => e => changeShow(!show),
  })
)(LeagueCreationButton);

export default createContainer(
  () => ({
    user: Meteor.user(),
  }),
  enhanced
);
