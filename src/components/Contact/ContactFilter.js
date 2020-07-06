import React, { useContext, useRef } from 'react';
import { ContactContext } from '../../context/contact/contactState';

const ContactFilter = () => {
  const searchRef = useRef('');

  const { filterContact, filteredContacts, clearFilter } = useContext(
    ContactContext
  );

  const onKeyUpHandler = () => {
    filterContact(searchRef.current.value);
  };

  const clearFilterHandler = () => {
    searchRef.current.value = '';
    clearFilter();
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
      {filteredContacts && (
        <button onClick={(e) => clearFilterHandler(e)}>Clear Filter</button>
      )}
    </div>
  );
};

export default ContactFilter;
