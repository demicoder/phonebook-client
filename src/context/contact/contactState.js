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
  CLEAR_FILTER,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types';

export const ContactContext = createContext();

const initialState = {
  contacts: null,
  current: null,
  loading: true,
  filtered: null
};

let HOST_URL = '';
if (process.env.NODE_ENV === 'production') {
  HOST_URL = 'https://phonebookapp-api.herokuapp.com';
} else if (process.env.NODE_ENV === 'development') {
  HOST_URL = 'http://localhost:4000';
}

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
      const res = await axios.post(
        `${HOST_URL}/api/v1/contact`,
        contact,
        axiosConfig
      );

      dispatch({ type: ADD_CONTACT, payload: res.data.contact });
    } catch (err) {
      console.log(err);
    }
  };

  const getContacts = async () => {
    try {
      const res = await axios.get(`${HOST_URL}/api/v1/contact`);

      dispatch({ type: GET_CONTACTS, payload: res.data.contacts });
    } catch (err) {
      console.log(err);
    }
  };

  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  const setEditContact = (contactId) =>
    dispatch({ type: SET_EDIT_CONTACT, payload: contactId });

  const editContact = async (contact) => {
    try {
      const res = await axios.patch(
        `/api/v1/contact/${contact.id}`,
        contact,
        axiosConfig
      );

      dispatch({ type: EDIT_CONTACT, payload: res.data.contact });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`${HOST_URL}/api/v1/contact/${contactId}`);

      dispatch({ type: DELETE_CONTACT, payload: contactId });
    } catch (err) {
      console.log(err);
    }
  };

  const filterContact = (text) =>
    dispatch({ type: FILTER_CONTACT, payload: text });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        filteredContacts: state.filtered,
        current: state.current,
        loading: state.loading,
        addContact,
        getContacts,
        setEditContact,
        editContact,
        deleteContact,
        clearCurrent,
        filterContact,
        clearFilter,
        clearContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
