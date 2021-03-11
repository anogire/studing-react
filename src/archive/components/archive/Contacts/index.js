import React from 'react';
import { connect } from 'react-redux';

import { fetchData, fetchDeleteItem, fetchUpdateItem, fetchInsertItem, selectContactsTable } from '../../store/contacts';
import { selectFormIsShow, selectFormIsNew, selectFormContact, toggleContactForm, editContact, addContact } from '../../store/contactForm';
import { ContactsTable } from '../ContactsTable';
import { ContactForm } from '../ContactForm';

class Contacts extends React.Component {

  componentDidMount() {
    this.props.getData();
  }

  render() {
    const { data, currentContact, toggleForm, isShowForm, isNew, remove, edit, update, insert, add } = this.props;
    return (
      <>
        <ContactsTable
          contacts={data}
          isShowForm={isShowForm}
          toggleForm={toggleForm}
          deleteContact={(value) => remove(value)}
          editContact={(value) => edit(value)}
          addContact={() => add()}
        />
        {
          (isShowForm) ?
            <ContactForm
              contact={currentContact}
              toggleForm={toggleForm}
              isNew={isNew}
              updateContact={(value) => update(value)}
              insertContact={(value) => insert(value)}
            /> :
            null
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectContactsTable(state),
  currentContact: selectFormContact(state),
  isShowForm: selectFormIsShow(state),
  isNew: selectFormIsNew(state)
});

const mapDispatchToProps = {
  getData: () => fetchData(),
  remove: (id) => fetchDeleteItem(id),
  update: (contact) => fetchUpdateItem(contact),
  insert: (contact) => fetchInsertItem(contact),
  edit: editContact,
  add: addContact,
  toggleForm: toggleContactForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);