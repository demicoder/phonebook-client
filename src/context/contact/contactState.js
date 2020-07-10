import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  SET_EDIT_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from '../types';

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  current: null,
  filtered: null
};

const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const addContact = async (contact) => {
    if (contact.name.trim().length <= 0 || contact.phone.trim().length <= 0) {
      return false;
    }

    try {
      const res = await axios.post('/api/v1/contact', contact, axiosConfig);

      console.log(res);

      dispatch({ type: ADD_CONTACT, payload: res.data.contact });
    } catch (err) {
      console.log(err);
    }
  };

  const setEditContact = (contactId) =>
    dispatch({ type: SET_EDIT_CONTACT, payload: contactId });

  const editContact = (contact) =>
    dispatch({ type: EDIT_CONTACT, payload: contact });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const deleteContact = (contactId) =>
    dispatch({ type: DELETE_CONTACT, payload: contactId });

  const filterContact = (text) =>
    dispatch({ type: FILTER_CONTACT, payload: text });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        filteredContacts: state.filtered,
        setEditContact,
        editContact,
        current: state.current,
        clearCurrent,
        deleteContact,
        filterContact,
        clearFilter
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
