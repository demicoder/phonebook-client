import React from 'react';
import './Header.scss';

const Header = () => (
  <header className="main-header">
    <div className="row">
      <div className="main-header__logo">
        <h1>
          <a href="/">Phonebook</a>
        </h1>
      </div>
      <nav className="main-header__nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
