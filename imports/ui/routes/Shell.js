import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Shell extends Component {
  render() {
    return (
      <div>
        <Header />

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
