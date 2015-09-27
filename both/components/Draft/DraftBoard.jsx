const {
  Row,
  Col
} = bootstrap;

DraftBoard = React.createClass({
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
