import React, { useEffect, useContext } from 'react';
import ContactForm from './ContactForm';
import './Contact.scss';
import ContactList from './ContactList';
import { AuthContext } from '../../context/auth/authState';

const Contact = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => loadUser())();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="contact">
      <div className="contact__wrap">
        <ContactForm />
        <ContactList />
      </div>
    </div>
  );
};
export default Contact;
