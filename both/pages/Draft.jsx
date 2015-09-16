const {
  Grid,
  Row,
  Col,
  Button
} = bootstrap;

Draft = React.createClass({

  handleBid() {
    console.log("pow");
  },
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <h4 className="text-center">$PLAYERNAME</h4>
              </Col>
              <Col xs={12} md={12} lg={12}>
                <div className="text-center">
                  <Button bsSize="medium" bsStyle="primary" block onClick={this.handleBid}>Bid + $AMOUNT</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div className="text-center">
              $PLAYER INFO
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});
