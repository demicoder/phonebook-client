import React, { useContext, Fragment, useEffect } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import ContactFilter from './ContactFilter';
import ContactItem from './ContactItem';
import Spinner from '../layouts/Spinner';
import './scss/ContactList.scss';

const ContactList = () => {
  const { contacts, getContacts, loading, filteredContacts } = useContext(
    ContactContext
  );

  const displayContacts = filteredContacts ? filteredContacts : contacts;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts && contacts.length === 0 && !loading) {
    return (
      <div className="contact__list">
        <div className="contact__empty">
          <h2 className="contact__empty--head">No contacts</h2>
          <p>Your phonebook is currently empty!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact__list">
      {contacts && !loading ? (
        <Fragment>
          <ContactFilter />
          {displayContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ContactList;
