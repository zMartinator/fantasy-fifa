import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../components/Header/index';
import Footer from '../components/Footer/index';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Header />

        <Row>
          <Col xs={6} xsOffset={6} md={6} mdOffset={6} lg={6} lgOffset={6}>
            {/* <LoginButtons/> */}
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

export default App;
