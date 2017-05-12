import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shell = props => (
  <div>
    <Header />

    <main
      style={{
        paddingLeft: '15px',
        paddingRight: '15px',
      }}
    >
      {props.children}
    </main>

    <Footer />
  </div>
);

export default Shell;
