import React, { createContext, useReducer } from 'react';
import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  loading: false
};

const AuthContextProvider = ({ children }) => {
  const [state] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ token: state.token, user: state.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
