import { React, Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Header, Row, Col, Footer } from 'react-bootstrap';

const LoginButtons = BlazeToReact('loginButtons');

export default class App extends Component {
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
          {this.props.children}
        </main>

        <Footer />
      </Grid>
    );
  }
}
