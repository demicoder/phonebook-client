import React from 'react';

const ContactFilter = () => {
  return (
    <div className="contact__filter">
      <input
        type="text"
        className="contact__filter--input-text"
        placeholder="Search contact"
      />
    </div>
  );
};

export default ContactFilter;
