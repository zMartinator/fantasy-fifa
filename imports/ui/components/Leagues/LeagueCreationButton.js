import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
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

class LeagueCreationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return this.props.user
      ? <div>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.handleOpenModal}
          >
            Create League
          </Button>

          <Modal
            isOpen={this.state.showModal}
            contentLabel="Leage Creation Modal"
            style={modalStyles}
          >
            <h1>Create League</h1>
            <LeagueCreationForm doneCallback={this.handleCloseModal} />
          </Modal>
        </div>
      : <Button bsStyle="default" bsSize="large" disabled>
          Login to Create
        </Button>;
  }
}

export default createContainer(
  () => ({
    user: Meteor.user(),
  }),
  LeagueCreationButton,
);
