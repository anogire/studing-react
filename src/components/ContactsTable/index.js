import React from 'react';
import './style.scss';

export class ContactsTable extends React.Component {

  render() {
    const cells = this.props.contact;

    return (
      <section className="ContactsTable-section">
        <h2 className="main-heading">Книга контактов</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Телефон</th>
            </tr>
          </thead>
          <tbody>
            {cells.map((contact, index) =>
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{contact.name}</td>
                <td>{contact.surName}</td>
                <td>{contact.phone}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }

}