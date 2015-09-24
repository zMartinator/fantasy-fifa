const {
  Row,
  Col,
  Button
} = bootstrap;

DraftStartButton = React.createClass({

  startDraft() {
    console.log("Trying to start draft");
  },
  render() {
    // If a user is not logged in they cannot see the Start Draft button.
    if(!this.props.currentUser) {
      return null;
    }

    // If the current Draft===null as in Not started, and the current logged in user is the leagueCreator let them see the button.
    if( (this.props.currentDraft.isDone === null) && (this.props.currentUser._id === this.props.currentLeague.leagueCreator) ) {
      return (
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Button bsSize="large" bsStyle="success" block onClick={this.startDraft} >Start Draft</Button>
          </Col>
        </Row>
      );
    }

    return null;
  }
});
