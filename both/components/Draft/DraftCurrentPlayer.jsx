const {
  Row,
  Col
} = bootstrap;

DraftCurrentPlayer = React.createClass({
  render() {
    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h3 className="text-center">
            {/*this.props.currentPlayer.name*/}
            PLAYERNAME | Soon to come playerData
          </h3>
        </Col>
      </Row>
    );
  }
});
