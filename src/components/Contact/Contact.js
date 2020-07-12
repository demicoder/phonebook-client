import React, { useEffect, useContext } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ScreenFiller from '../layouts/ScreenFiller';
import { AuthContext } from '../../context/auth/authState';
import './scss/Contact.scss';

const Contact = () => {
  const { loadUser, loading } = useContext(AuthContext);

  useEffect(() => {
    (async () => loadUser())();
    // eslint-disable-next-line
  }, []);

  if (loading) return <ScreenFiller />;

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
