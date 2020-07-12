import React, { useState, useContext, useEffect } from 'react';

import { ContactContext } from '../../context/contact/contactState';
import './scss/ContactForm.scss';

const ContactForm = () => {
  const { addContact, current, editContact, clearCurrent } = useContext(
    ContactContext
  );

  const initialContact = {
    name: '',
    phone: '',
    type: 'personal'
  };

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current) setContact(current);
  }, [current]);

  const submitHandler = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact(initialContact);
  };

  const editHandler = async (e) => {
    e.preventDefault();
    editContact(contact);
    setContact(initialContact);
  };

  const onChangeHandler = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const clearCurrentHandler = (e) => {
    clearCurrent(e);
    setContact(initialContact);
  };

  return (
    <form
      className="contact-form"
      onSubmit={(e) => (current ? editHandler(e) : submitHandler(e))}
    >
      <div className="contact-form__input-group">
        <label className="contact-form__label">
          <span className="contact-form__label-text">Name</span>
          <input
            className="contact-form__text-input"
            type="text"
            onChange={(e) => onChangeHandler(e)}
            value={contact.name}
            placeholder="Contact Name"
            id="name"
            name="name"
          />
        </label>
      </div>
      <div className="contact-form__input-group">
        <label className="contact-form__label">
          <span className="contact-form__label-text">Phone number</span>
          <input
            className="contact-form__text-input"
            type="text"
            name="phone"
            onChange={(e) => onChangeHandler(e)}
            value={contact.phone}
            placeholder="Phone number"
            id="phone"
          />
        </label>
      </div>

      <div className="contact-form__input-group">
        <span className="contact-form__label-text">Contact Type</span>

        <div>
          <label className="contact-form__radio-label">
            <input
              checked={contact.type === 'personal'}
              type="radio"
              name="type"
              value="personal"
              onChange={(e) => onChangeHandler(e)}
            />
            Personal
          </label>

          <label className="contact-form__radio-label">
            <input
              type="radio"
              name="type"
              checked={contact.type === 'professional'}
              onChange={(e) => onChangeHandler(e)}
              value="professional"
            />
            Professional
          </label>
        </div>
      </div>

      <div className="contact-form__input-group">
        <button
          type="submit"
          className="contact-form__btn contact-form__btn--action"
        >
          {current ? 'Edit Contact' : 'Save Contact'}
        </button>
        {current && (
          <button
            type="submit"
            onClick={(e) => clearCurrentHandler(e)}
            className="contact-form__btn contact-form__btn--cancel"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
