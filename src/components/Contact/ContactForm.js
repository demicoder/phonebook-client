import React from 'react';

const ContactForm = () => {
  return (
    <form className="contact-form">
      <div className="contact-form__input-group">
        <label className="contact-form__label">
          <span className="contact-form__label-text">Name</span>
          <input
            className="contact-form__text-input"
            type="text"
            placeholder="Contact Name"
            id="name"
          />
        </label>
      </div>
      <div className="contact-form__input-group">
        <label className="contact-form__label">
          <span className="contact-form__label-text">Phone number</span>
          <input
            className="contact-form__text-input"
            type="text"
            placeholder="Phone number"
            id="phone"
          />
        </label>
      </div>

      <div className="contact-form__input-group">
        <span className="contact-form__label-text">Contact Type</span>

        <div>
          <label className="contact-form__radio-label">
            <input type="radio" name="type" value="personal" />
            Personal
          </label>

          <label className="contact-form__radio-label">
            <input type="radio" name="type" value="professional" />
            Professional
          </label>
        </div>
      </div>

      <div className="contact-form__input-group">
        <button type="submit" className="contact-form__submit-btn">
          Save Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
