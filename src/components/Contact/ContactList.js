import React, { useContext, Fragment, useEffect } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import ContactFilter from './ContactFilter';
import ContactItem from './ContactItem';
import './ContactList.scss';

const ContactList = () => {
  const { contacts, getContacts, loading, filteredContacts } = useContext(
    ContactContext
  );

  const displayContacts = filteredContacts ? filteredContacts : contacts;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contact__list">
      {contacts && !loading && contacts.length ? (
        <Fragment>
          <ContactFilter />
          {displayContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </Fragment>
      ) : (
        <div className="contact__empty">
          <h2 className="contact__empty--head">No contacts</h2>
          <p>Your phonebook is currently empty!</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
