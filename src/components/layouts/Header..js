import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="main-header">
    <div className="row">
      <div className="main-header__logo">
        <h1>
          <Link to="/">Phonebook</Link>
        </h1>
      </div>
      <nav className="main-header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Create Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
