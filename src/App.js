import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/layouts/Header.';
import Contact from './components/Contact/Contact';
import ContactContextProvider from './context/contact/contactState';
import AuthContextProvider from './context/auth/authState';
import './App.scss';
import AboutPage from './components/pages/About';
import RegisterPage from './components/pages/auth/Register';

const App = () => {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <BrowserRouter>
          <Header />

          <div className="row">
            <div className="content">
              <Switch>
                {/* About page */}

                <Route path="/about" exact>
                  <AboutPage />
                </Route>

                <Route path="/register" exact>
                  <RegisterPage />
                </Route>

                {/* Homepage */}
                <Route path="/" exact>
                  <Contact />
                </Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ContactContextProvider>
    </AuthContextProvider>
  );
};

export default App;
