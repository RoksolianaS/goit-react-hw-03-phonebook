import React from 'react';
import css from './ContactList.module.css';

const ContactList = ({ contacts, handleDeleteContact }) => {
  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li className={css.contact_item} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              type="button"
              className={css.delete_btn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ContactList };