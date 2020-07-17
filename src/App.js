import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Contact from './components/Contact/Contact';
import ContactContextProvider from './context/contact/contactState';
import AuthContextProvider from './context/auth/authState';
import AboutPage from './components/pages/About';
import RegisterPage from './components/pages/auth/Register';
import LoginPage from './components/pages/auth/Login';
import AlertContextProvider from './context/alert/alertContext';
import Alerts from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoutes from './components/routing/PrivateRoute';

import './App.scss';

if (localStorage.getItem('jwt')) setAuthToken(localStorage.getItem('jwt'));

const App = () => {
  return (
    <AuthContextProvider>
      <ContactContextProvider>
        <AlertContextProvider>
          <BrowserRouter>
            <Header />

            <div className="row row__main">
              <div className="content">
                <Alerts />

                <Switch>
                  {/* About page */}
                  <Route path="/about" exact>
                    <AboutPage />
                  </Route>

                  {/* Register page */}
                  <Route path="/register" exact>
                    <RegisterPage />
                  </Route>

                  {/* Login page */}
                  <Route path="/login" exact>
                    <LoginPage />
                  </Route>

                  {/* Homepage */}
                  <PrivateRoutes path="/" exact component={Contact} />
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
