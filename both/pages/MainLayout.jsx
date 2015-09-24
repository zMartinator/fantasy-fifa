const {
  Grid,
  Row,
  Col
} = bootstrap;

MainLayout = React.createClass({

  render() {
    return (
      <Grid>
        <Header />

        <Row>
          <Col xs={6} xsOffset={6} md={6} mdOffset={6} lg={6} lgOffset={6}>
            <LoginButtons/>
          </Col>
        </Row>

        <main>
          {this.props.content}
        </main>

        <Footer />
      </Grid>
    );
  }
});
