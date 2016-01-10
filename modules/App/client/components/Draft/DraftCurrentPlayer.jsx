import { createClass } from 'react';
import { Row, Col } from 'react-bootstrap';

const DraftCurrentPlayer = createClass({
  render() {
    if(this.props.currentLeague.currentPlayerUpForBidId) {
      return (
        <Row>
          <Col xs={12} md={12} lg={12}>
            <h3 className="text-center">
              {this.props.currentUser.profile.draftMoney}
            </h3>
          </Col>
        </Row>
      );
    }

    return null;
  }
});

export default DraftCurrentPlayer;
