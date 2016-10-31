import React, { createClass } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = createClass({
  render() {
    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">FIFA Fantasy</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href='/'>Home</NavItem>
          <NavItem eventKey={2} href='/about'>About</NavItem>
        </Nav>
      </Navbar>
    );
  }
});

export default Header;
