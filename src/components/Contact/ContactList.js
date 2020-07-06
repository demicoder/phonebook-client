import React, { useContext, Fragment } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import './ContactList.scss';
import ContactFilter from './ContactFilter';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts, filteredContacts } = useContext(ContactContext);

  const displayContacts = filteredContacts ? filteredContacts : contacts;

  return (
    <div className="contact__list">
      {contacts.length ? (
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
