import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN,
  LOGOUT
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('jwt') || null,
  user: null,
  loading: true,
  isAuth: false
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (localStorage.getItem('jwt')) setAuthToken(localStorage.getItem('jwt'));

    try {
      const res = await axios.get('/api/v1/user/auth');
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
    try {
      const res = await axios.post('/api/v1/user', formData, axiosConfig);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: res.data.user, jwt: res.data.token }
      });
      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  };

  // Login user
  const loginUser = async (formData) => {
    try {
      const res = await axios.post('/api/v1/user/login', formData, axiosConfig);

      dispatch({
        type: LOGIN,
        payload: { user: res.data.user, jwt: res.data.token }
      });

      loadUser();
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.get('/api/v1/user/logout');
      console.log(res);
      dispatch({ type: LOGOUT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
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
