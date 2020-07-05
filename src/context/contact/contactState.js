import React, { createContext, useReducer } from 'react';
import contactReducer from './contactReducer';
import { ADD_CONTACT, SET_EDIT_CONTACT } from '../types';

export const ContactContext = createContext();

const initialState = {
  contacts: [
    { id: '1', name: 'Maverick', phone: '123-333-444', type: 'personal' },
    { id: '2', name: 'Felix', phone: '555-555-111-111', type: 'professional' }
  ],
  currentEdit: null
};

const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = (contact) => {
    if (contact.name.trim().length <= 0 || contact.phone.trim().length <= 0) {
      return false;
    }

    const newContact = {
      ...contact,
      id: new Date().valueOf().toString()
    };

    dispatch({ type: ADD_CONTACT, payload: newContact });
  };

  const setEditContact = (contactId) => {
    dispatch({ type: SET_EDIT_CONTACT, payload: contactId });
  };

  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts, addContact, setEditContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
