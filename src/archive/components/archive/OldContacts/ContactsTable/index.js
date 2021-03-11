import React from 'react';
import './style.scss';

export class ContactsTable extends React.Component {

  render() {
    const cells = this.props.contacts;
    const isShowForm = this.props.isShowForm;

    return (
      <section className={"ContactsTable-section " +
        (isShowForm ? 'ContactsTable-section--isShowForm' : null)}>
        <h2 className="main-heading">Книга контактов</h2>

        <button type="button" onClick={() => this.props.toggleForm(true, null)} disabled={isShowForm}
          className="btn btn-primary mb-3" aria-label="добавить контакт">
          Добавить контакт
        </button>

        <table className={"table table-striped " + (isShowForm ? 'table-responsive' : null)}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Телефон</th>
              <th colSpan="2" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cells.map((contact, index) => this.getRecord(isShowForm, contact, index))}
          </tbody>
        </table>
      </section>
    );
  }

  getRecord(isShowForm, contact, index) {
    return (
      <tr key={index}>
        <th scope="row">{contact.id}</th>
        <td>{contact.name}</td>
        <td>{contact.surName}</td>
        <td>{contact.phone}</td>
        <td>
          <button type="button" onClick={() => this.props.toggleForm(true, contact)} disabled={isShowForm}
            className="btn btn-info" aria-label="редактировать контакт">
            Редактировать
          </button>
        </td>
        <td>
          <button type="button" onClick={() => this.props.deleteContact(contact.id)} disabled={isShowForm}
            className="btn btn-danger" aria-label="удалить контакт">
            Удалить
          </button>
        </td>
      </tr>
    )
  }

}