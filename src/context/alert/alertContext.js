import React, { createContext, useReducer } from 'react';
import alertReducer from './alertReducer';
import { ADD_ALERT, REMOVE_ALERT } from '../types';

export const AlertContext = createContext();

const initialState = [];

const AlertContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //   Add alert
  const addAlert = (newAlert, timeout = 5000) => {
    const id = `${Math.random()}-${new Date().valueOf()}`;

    newAlert.id = id;

    dispatch({ type: ADD_ALERT, payload: newAlert });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: newAlert.id });
    }, timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
