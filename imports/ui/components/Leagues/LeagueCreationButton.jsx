import React, { createClass } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LeagueCreationForm from './LeagueCreationForm';

const LeagueCreationButton = createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {

    if(this.props.currentUser) {
      return (
        <div>

          <Button bsStyle="primary" bsSize="large" onClick={this.open}>
            Create League
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Create League</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LeagueCreationForm currentUserId={this.props.currentUser._id} doneCallback={this.close} />
            </Modal.Body>
          </Modal>
        </div>
      );
    }

    return (
      <Button bsStyle="default" bsSize="large" disabled >
        Login to Create
      </Button>
    );


  }
});

export default LeagueCreationButton;
