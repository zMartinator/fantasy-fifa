import { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from 'App/client/components/Header/Header';
import Footer from 'App/client/components/Footer/Footer';

const LoginButtons = BlazeToReact('loginButtons');

class App extends Component {
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

export default App;
