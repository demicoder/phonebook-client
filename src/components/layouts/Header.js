import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authState';
import './Header.scss';

const Header = () => {
  const { isAuth, user, logoutUser } = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Create Account</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>{user && `Hello ${user.name}`}</li>

      <li>
        <a href="#?logout" onClick={(e) => logoutHandler(e)}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  return (
    <header className="main-header">
      <div className="row">
        <div className="main-header__logo">
          <h1>
            <Link to="/">Phonebook</Link>
          </h1>
        </div>
        <nav className="main-header__nav">
          <ul>{isAuth ? authLinks : guestLinks}</ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
