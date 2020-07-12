import React, { useContext } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import './scss/ContactItem.scss';

const ContactItem = ({ contact }) => {
  const { setEditContact, deleteContact } = useContext(ContactContext);

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
          <button onClick={(e) => deleteContact(contact.id)}>Delete</button>
          <button onClick={(e) => setEditContact(contact.id)}>Edit</button>
        </div>
      </div>
    </div>
  );
};
export default ContactItem;
