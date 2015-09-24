const {
  Grid,
  Row,
  Col,
  Button
} = bootstrap;

DraftCurrentBid = React.createClass({
  render() {
    var currentBid = this.props.currentDraft.currentBids.length > 0 ? this.props.currentDraft.currentBids[this.props.currentDraft.currentBids.length - 1].value : -1;
    var currentPlayerUpForBid = this.props.currentDraft.currentPlayerUpForBidId !== -1 ? this.props.currentDraft.currentPlayerUpForBidId : "Waiting For Nomination";

    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h4 className="text-center">{currentPlayerUpForBid}</h4>
        </Col>
        <Col xs={12} md={12} lg={12}>
          <div className="text-center">
            <DraftCurrentBidButton
              currentDraft={this.props.currentDraft}
              currentUser={this.props.currentUser}
              currentLeague={this.props.currentLeague}
              handleBidCallback={this.props.handleBidCallback}
            />
          </div>
        </Col>
      </Row>
    );
  }
});
