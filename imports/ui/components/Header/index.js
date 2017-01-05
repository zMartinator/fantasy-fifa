import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
  <div style={{
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    minHeight: '50px',
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginReft: 'auto',

    display: 'flex',
    justifyContent: 'space-between',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: '26px',
    }}>
      <IndexLink to="/">FIFA Fantasy</IndexLink>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontSize: '16px',
    }}>
      <IndexLink to="/" style={{ padding: '5px' }}>Home</IndexLink>
      <Link to="/about" style={{ padding: '5px' }}>About</Link>
    </div>
  </div>
);

export default Header;
