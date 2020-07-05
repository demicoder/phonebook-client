import React, { useContext } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import './ContactItem.scss';

const ContactItem = ({ contact }) => {
  const { setEditContact } = useContext(ContactContext);

  const editContactHandler = (contactId) => setEditContact(contactId);

  return (
    <div className="contact__item">
      <div>
        <h2 className="contact__name">{contact.name}</h2>
        <h3 className="contact__phone">{contact.phone}</h3>
      </div>
      <div className="contact__info">
        <p className={`contact__type contact__type--${contact.type}`}>
          {contact.type.slice(0, 1).toUpperCase()}
          {contact.type.slice(1)}
        </p>
        <div className="contact__control">
          <button>Delete</button>
          <button onClick={(e) => editContactHandler(contact.id)}>Edit</button>
        </div>
      </div>
    </div>
  );
};
export default ContactItem;
