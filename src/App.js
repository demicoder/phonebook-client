import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/layouts/Header.';
import Contact from './components/Contact/Contact';
import ContactContextProvider from './context/contact/contactState';
import AuthContextProvider from './context/auth/authState';
import AboutPage from './components/pages/About';
import RegisterPage from './components/pages/auth/Register';
import LoginPage from './components/pages/auth/Login';
import './App.scss';
import AlertContextProvider from './context/alert/alertContext';
import Alerts from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('jwt')) setAuthToken(localStorage.getItem('jwt'));

const App = () => {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <AlertContextProvider>
          <BrowserRouter>
            <Header />

            <div className="row">
              <div className="content">
                <Alerts />

                <Switch>
                  {/* About page */}

                  <Route path="/about" exact>
                    <AboutPage />
                  </Route>

                  <Route path="/register" exact>
                    <RegisterPage />
                  </Route>

                  <Route path="/login" exact>
                    <LoginPage />
                  </Route>

                  {/* Homepage */}
                  <Route path="/" exact>
                    <Contact />
                  </Route>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </AlertContextProvider>
      </ContactContextProvider>
    </AuthContextProvider>
  );
};

export default App;
