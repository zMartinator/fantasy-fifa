const {
  Row,
  Col
} = bootstrap;

DraftStatusBanner = React.createClass({
  render() {
    let statusMessage = "";

    if(this.props.isDone === false) {
      statusMessage = "Draft underway!";
    } else if (this.props.isDone === null) {
      statusMessage = "Awaiting league creator to start";
    } else if(this.props.isDone) {
      statusMessage = "Draft Done! We did it!";
    } else {
      console.log("weird condition? league.isDone !== null/true/false");
      console.log(this.props.isDone);
      return null;
    }

    return (
      <Row>
        <Col xs={12} md={12} lg={12}>
          <h5 className="text-center" >{statusMessage}</h5>
        </Col>
      </Row>
    );
  }
});
