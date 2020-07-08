import React, { useState, useContext } from 'react';

import './AuthForm.scss';
import { AlertContext } from '../../../context/alert/alertContext';

const LoginPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { addAlert } = useContext(AlertContext);

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();

    if (user.email.trim() === '' || user.password.trim() === '') {
      return addAlert({ type: 'error', msg: 'All fields are required' });
    }
  };

  return (
    <div className="auth-form__wrap">
      <h2 className="auth-form__title">Login to your account</h2>

      <form onSubmit={(e) => submitHandler(e)} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="Enter your E-mail address"
            value={user.email}
            onChange={(e) => onChangeHandler(e)}
            name="email"
            id="email"
            className="auth-form__input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Enter your password"
            name="password"
            className="auth-form__input"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="auth-form__action">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
