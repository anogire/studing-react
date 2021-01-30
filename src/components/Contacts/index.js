import React from 'react';
import { ContactsTable } from '../ContactsTable';
import { ContactsForm } from '../ContactsForm';

const URL = 'https://6013f25bb5389800175688b1.mockapi.io';

export class Contacts extends React.Component {
  state = {
    isShowForm: false,
    contacts: [],
    editContact: null,
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <ContactsTable
          contacts={this.state.contacts}
          isShowForm={this.state.isShowForm}
          deleteContact={(value) => this.deleteContact(value)}
          toggleForm={this.toggleForm}
        />
        {
          this.state.isShowForm ?
            <ContactsForm
              contact={this.state.editContact}
              addContact={(value) => this.addContact(value)}
              updateContact={(value) => this.updateContact(value)}
              toggleForm={this.toggleForm}
            /> :
            null
        }
      </React.Fragment>
    );
  }

  toggleForm = (value, contact = null) => {
    this.setState({
      editContact: contact,
      isShowForm: value
    });
  }

  async getData() {
    const response = await fetch(URL + '/contacts');
    const data = await response.json();
    this.setState({
      contacts: data,
    });
  }

  async addContact({ name, surName, phone }) {
    await fetch(URL + '/contacts', {
      method: 'POST',
      body: JSON.stringify({ name, surName, phone }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    await this.getData();
    this.toggleForm(false);
  }

  async updateContact({ id, name, surName, phone }) {
    await fetch(URL + '/contacts/' + id, {
      method: 'PUT',
      body: JSON.stringify({ name, surName, phone }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    await this.getData();
    this.toggleForm(false);
  }

  async deleteContact(id) {
    await fetch(URL + '/contacts/' + id, {
      method: 'DELETE'
    });
    await this.getData();
  }
}