import React from 'react';

import './ContactItem.scss';

const ContactItem = ({ contact }) => (
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
        <button>Edit</button>
      </div>
    </div>
  </div>
);

export default ContactItem;
