import { createClass } from 'react';
import { Row, Col } from 'react-bootstrap';
import { DraftBoardUserItem } from './DraftBoardUserItem';

const DraftBoard = createClass({
  render() {
    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
            {this.props.currentLeagueUsers.map(function(user) {
              return <DraftBoardUserItem user={user} key={user._id} />;
            })}
        </Col>
      </Row>
    );
  }
});

export default DraftBoard;
