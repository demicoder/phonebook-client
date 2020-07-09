import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('jwt') || null,
  user: null,
  loading: false,
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

  // Register user
  const registerUser = async (formData) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

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

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        registerUser,
        loadUser,
        user: state.user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
