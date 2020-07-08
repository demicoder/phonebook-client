import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  loading: false,
  isAuth: false
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (formData) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/v1/user', formData, axiosConfig);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  };

  return (
    <AuthContext.Provider
      value={{ token: state.token, registerUser, user: state.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
