import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';
import authReducer from './authReducer';
import {
  REGISTER,
  USER_LOADED,
  LOGIN,
  LOGOUT,
  REGISTER_ERROR,
  AUTH_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  CLEAR_ERRORS,
  START_AUTH
} from '../types';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('jwt') || null,
  user: null,
  loading: true,
  error: null,
  startAuth: false,
  isAuth: false
};

let HOST_URL = '';
if (process.env.NODE_ENV === 'production') {
  HOST_URL = 'https://phonebookapp-api.herokuapp.com';
} else if (process.env.NODE_ENV === 'development') {
  HOST_URL = 'http://localhost:4000';
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.getItem('jwt')) setAuthToken(localStorage.getItem('jwt'));

    try {
      const res = await axios.get(`${HOST_URL}/api/v1/user/auth`);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data });
    }
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Register user
  const registerUser = async (formData) => {
    dispatch({ type: START_AUTH });

    try {
      const res = await axios.post(
        `${HOST_URL}/api/v1/user`,
        formData,
        axiosConfig
      );

      dispatch({
        type: REGISTER,
        payload: { user: res.data.user, jwt: res.data.token }
      });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_ERROR, payload: err.response.data });
      clearErrors();
    }
  };

  // Login user
  const loginUser = async (formData) => {
    dispatch({ type: START_AUTH });

    try {
      const res = await axios.post(
        `${HOST_URL}/api/v1/user/login`,
        formData,
        axiosConfig
      );

      console.log(res.data);
      dispatch({
        type: LOGIN,
        payload: { user: res.data.user, jwt: res.data.token }
      });

      await loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_ERROR, payload: err.response.data });
      clearErrors();
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.get(`${HOST_URL}/api/v1/user/logout`);
      dispatch({ type: LOGOUT, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGOUT_ERROR, payload: err.response.data });
      clearErrors();
    }
  };

  const clearErrors = (timeout = 5000) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ERRORS });
    }, timeout);
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        startAuth: state.startAuth,
        loading: state.loading,
        error: state.error,
        registerUser,
        loginUser,
        loadUser,
        logoutUser,
        user: state.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
