import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

const Footer = () => (
  <Grid>
    <Row>
      <Col xs={12} md={12} lg={12}>
        <footer className="footer">
          &copy; Ben Diuguid 2017
        </footer>
      </Col>
    </Row>
  </Grid>
);

export default Footer;
