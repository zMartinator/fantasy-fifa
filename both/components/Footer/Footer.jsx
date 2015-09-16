const {
  Grid,
  Col,
  Row
} = bootstrap;

Footer = React.createClass({
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <footer className='Footer'>
              &copy; Ben Diuguid 2015
            </footer>
          </Col>
        </Row>
      </Grid>
    );
  }
});
