import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Shell = props => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Header />

    <main style={{ paddingLeft: '15px', paddingRight: '15px', flex: 1 }}>
      {props.children}
    </main>

    <Footer />
  </div>
);

export default Shell;
