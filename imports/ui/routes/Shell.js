import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginButtons from '../components/LoginButtons';
import User from '../components/User';

class Shell extends Component {
  render() {
    return (
      <div>
        <Header />

        <LoginButtons />

        <User />

        <main style={{
          paddingLeft: '15px',
          paddingRight: '15px',
        }}>
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

export default Shell;
