import React, { useState, useContext, useEffect } from 'react';

import { withRouter } from 'react-router-dom';

import { AlertContext } from '../../../context/alert/alertContext';
import './AuthForm.scss';
import { AuthContext } from '../../../context/auth/authState';

const RegisterPage = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { registerUser, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isAuth) props.history.push('/');
  }, [isAuth, props.history]);

  const { addAlert } = useContext(AlertContext);

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();

    if (user.name.trim() === '' || user.email.trim() === '') {
      addAlert({ type: 'error', msg: 'All fields are required' });
    } else {
      registerUser(user);
    }
  };

  return (
    <div className="auth-form__wrap">
      <h2 className="auth-form__title">Create an account</h2>
      <form onSubmit={(e) => submitHandler(e)} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="auth-form__input"
            type="text"
            value={user.name}
            onChange={(e) => onChangeHandler(e)}
            id="name"
            placeholder="Enter your full name"
            name="name"
          />
        </div>

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
            placeholder="Enter a password longer than 5 characters"
            name="password"
            className="auth-form__input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={user.passwordConfirm}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Confirm the password you entered above"
            className="auth-form__input"
            id="password-confirm"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="auth-form__action">
            Create Accout
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(RegisterPage);
