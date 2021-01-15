import React from 'react';
import '../styles/main.scss';
import { Contacts } from './Contacts';
import { ContactsForm } from './ContactsForm';

export class Main extends React.Component {
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
      <main className="container-fluid Main-main">
        <div className="wrapper">
          <Contacts contact={this.state.contact} />
          <button type="button" onClick={this.toggleForm} disabled={this.state.isShowForm}
            className="btn btn-primary mt-3">
            Добавить контакт
          </button>
        </div>
        {this.state.isShowForm ?
          <ContactsForm updateData={this.updateData} addContact={this.addContact} /> :
          null}
      </main>
    );
  }

  toggleForm = () => {
    this.setState({
      isShowForm: !this.state.isShowForm
    });
  }

  updateData = (value) => {
    this.setState({ isShowForm: !value });
  }

  addContact = (value) => {
    this.setState({
      contact: [...this.state.contact, value]
    })
  }
}