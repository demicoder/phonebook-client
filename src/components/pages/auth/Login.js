import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Spinner from '../../layouts/Spinner';
import { AlertContext } from '../../../context/alert/alertContext';
import { AuthContext } from '../../../context/auth/authState';
import './AuthForm.scss';

const LoginPage = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { loginUser, isAuth, error: authError, startAuth } = useContext(
    AuthContext
  );

  const { addAlert } = useContext(AlertContext);

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuth) {
      props.history.push('/');
    }

    if (authError && authError.message) {
      addAlert({ type: 'error', msg: authError?.message });
    }

    // eslint-disable-next-line
  }, [isAuth, props.history, authError]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.email.trim() === '' || user.password.trim() === '') {
      return addAlert({ type: 'error', msg: 'All fields are required' });
    }

    await loginUser(user);
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
            required
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
            required
            value={user.password}
            onChange={(e) => onChangeHandler(e)}
            placeholder="Enter your password"
            name="password"
            className="auth-form__input"
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="auth-form__action"
            disabled={startAuth}
          >
            <div type="submit" className="auth-form__action--wrap">
              {startAuth ? (
                <Spinner height="25px" width="25px" strokeWidth="4px" />
              ) : (
                'Login'
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
