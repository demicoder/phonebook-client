import React, { useContext, useRef } from 'react';
import { ContactContext } from '../../context/contact/contactState';

const ContactFilter = () => {
  const searchRef = useRef('');

  const { filterContact } = useContext(ContactContext);

  const onKeyUpHandler = () => {
    filterContact(searchRef.current.value);
  };

  return (
    <div className="contact__filter">
      <input
        type="search"
        ref={searchRef}
        onKeyUp={(e) => onKeyUpHandler()}
        className="contact__filter--input-text"
        placeholder="Search contact"
      />
    </div>
  );
};

export default ContactFilter;
