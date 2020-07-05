import React, { Fragment } from 'react';
import Header from './components/layouts/Header.';
import Contact from './components/Contact/Contact';
import './App.scss';

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="content">
        <Contact />
      </div>
    </Fragment>
  );
};

export default App;
