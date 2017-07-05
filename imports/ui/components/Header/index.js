import React from 'react';
import { Link } from 'react-router-dom';
import LoginButtons from './LoginButtons';

const Header = () =>
  <div
    style={{
      backgroundColor: '#3f51b5',
      color: '#ffffff',
      minHeight: '50px',
      paddingRight: '15px',
      paddingLeft: '15px',
      marginRight: 'auto',
      marginReft: 'auto',

      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '26px',
      }}
    >
      <Link to="/">FIFA Fantasy</Link>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontSize: '16px',
      }}
    >
      <Link to="/" style={{ padding: '5px' }}>
        Home
      </Link>
      <Link to="/about" style={{ padding: '5px' }}>
        About
      </Link>
      <LoginButtons />
    </div>
  </div>;

export default Header;
