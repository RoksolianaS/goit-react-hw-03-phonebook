import React from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({
  name,
  number,
  handleNameChange,
  handleAddContact,
  handlePhoneChange,
}) => {
  return (
    <div>
      <form className={css.form}>
        <label className={css.label}>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />

        <label className={css.label}>Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handlePhoneChange}
        />

        <button className={css.btn} type="button" onClick={handleAddContact}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export { ContactForm };