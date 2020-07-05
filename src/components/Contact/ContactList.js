import React, { useContext } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import './ContactList.scss';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <div className="contact__list">
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
