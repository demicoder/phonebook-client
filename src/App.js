import React from 'react';

import Header from './components/layouts/Header.';
import Contact from './components/Contact/Contact';
import ContactContextProvider from './context/contact/contactState';
import './App.scss';

const App = () => {
  return (
    <ContactContextProvider>
      <Header />
      <div className="content">
        <Contact />
      </div>
    </ContactContextProvider>
  );
};

export default App;
