import React, { createContext, useReducer } from 'react';
import contactReducer from './contactReducer';
import { ADD_CONTACT } from '../types';

export const ContactContext = createContext();

const initialState = {
  contacts: [
    { id: '1', name: 'Maverick', phone: '123-333-444', type: 'personal' },
    { id: '2', name: 'Felix', phone: '555-555-111-111', type: 'professional' }
  ]
};

const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  return (
    <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
