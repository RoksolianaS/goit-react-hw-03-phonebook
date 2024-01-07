import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './Form.module.css';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
    number: '',
  };

  updateState = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  handleAction = (type, e) => {
    this.updateState(type, e.target.value);
  };

  // handleNameChange = e => {
  //   this.setState({ name: e.target.value });
  // };

  // handlePhoneChange = e => {
  //   this.setState({ number: e.target.value });
  // };

  handleAddContact = () => {
    const { contacts, name, number } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      alert('Please, enter name and phone number');
      return;
    }

    const isNameExist = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    this.setState({
      contacts: [...contacts, newContact],
      name: '',
      number: '',
    });
  };

  handleFilter = (type, e) => {
    this.updateState(type, e.target.value);
  };

  handleDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.form_container}>
        <h1>Phonebook</h1>

        <ContactForm
          name={name}
          number={number}
          handleNameChange={(e) => this.handleAction('name', e)}
          handleAddContact={this.handleAddContact}
          handlePhoneChange={(e) => this.handleAction('number', e)}
        />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilter={(e) => this.handleFilter('filter', e)} />
        <ContactList
          contacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
