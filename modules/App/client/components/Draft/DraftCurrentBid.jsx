import { createClass } from 'react';
import { Row, Col } from 'react-bootstrap';
import { DraftCurrentBidButton } from './DraftCurrentBidButton';

const DraftCurrentBid = createClass({
  render() {
    var currentBid = this.props.currentLeague.currentBids.length > 0 ? this.props.currentLeague.currentBids[this.props.currentLeague.currentBids.length - 1] : -1;
    var currentPlayerUpForBid = this.props.currentLeague.currentPlayerUpForBidId !== -1 ? this.props.currentLeague.currentPlayerUpForBidId : "Waiting For Nomination";

    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h2 className="text-center">{this.props.currentLeague.currentNominationClock === 0 ? this.props.currentLeague.currentBidClock : this.props.currentLeague.currentNominationClock }</h2>
        </Col>
        <Col xs={12} md={12} lg={12}>
          <h4 className="text-center"><strong>{currentPlayerUpForBid}</strong> for <strong>{currentBid.value}</strong> by <strong>{currentBid.username}</strong></h4>
        </Col>
        <Col xs={12} md={12} lg={12}>
          <div className="text-center">
            <DraftCurrentBidButton
              currentUser={this.props.currentUser}
              currentLeague={this.props.currentLeague}
              currentBid={currentBid}
              handleBidCallback={this.props.handleBidCallback}
            />
          </div>
        </Col>
      </Row>
    );
  }
});

export default DraftCurrentBid;
