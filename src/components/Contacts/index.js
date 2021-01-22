import React from 'react';
import './style.scss';
import { ContactsTable } from '../ContactsTable';
import { ContactsForm } from '../ContactsForm';

export class Contacts extends React.Component {
  state = {
    isShowForm: false,
    contact: [{
      name: 'Иван',
      surName: 'Иванов',
      phone: '+380 (50) 123-45-67'
    }]
  };

  render() {
    return (
      <main className="container-fluid Contacts-main">
        <div className="Contacts-wrapper">
          <ContactsTable contact={this.state.contact} />
          <button type="button" onClick={this.toggleForm} disabled={this.state.isShowForm}
            className="btn btn-primary mt-3">
            Добавить контакт
          </button>
        </div>
        {this.state.isShowForm ?
          <ContactsForm addContact={this.addContact} /> :
          null}
      </main>
    );
  }

  toggleForm = () => {
    this.setState({
      isShowForm: !this.state.isShowForm
    });
  }

  addContact = (value) => {
    if (value) {
      this.setState({
        contact: [...this.state.contact, value]
      })
    }
    this.toggleForm();
  }
}