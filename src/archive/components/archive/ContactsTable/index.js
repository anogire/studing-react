import './style.scss';

export function ContactsTable(props) {
  const { contacts, isShowForm, addContact, toggleForm } = props;

  return (
    <section className={"ContactsTable-section " +
      (isShowForm ? 'ContactsTable-section--isShowForm' : null)}>
      <h2 className="main-heading">
        {(contacts.length === 0) ? 'Список контактов пуст' : 'Книга контактов'}
      </h2>

      <button
        type="button"
        disabled={isShowForm}
        onClick={() => { addContact(); toggleForm(true); }}
        className="btn btn-primary mb-3"
        aria-label="добавить контакт">
        Добавить контакт
      </button>

      {(contacts.length !== 0) ?
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
            {contacts.map((contact, index) => getRecord(props, contact, index))}
          </tbody>
        </table>
        : null
      }
    </section>
  )
}

function getRecord(props, contact, index) {
  const { isShowForm, deleteContact, editContact, toggleForm } = props;

  return (
    <tr key={index}>
      <th scope="row">{contact.id}</th>
      <td>{contact.name}</td>
      <td>{contact.surName}</td>
      <td>{contact.phone}</td>
      <td>
        <button
          type="button"
          disabled={isShowForm}
          onClick={() => { editContact(contact); toggleForm(true); }}
          className="btn btn-info" aria-label="редактировать контакт">
          Редактировать
        </button>
      </td>
      <td>
        <button
          type="button"
          disabled={isShowForm}
          onClick={() => deleteContact(contact.id)}
          className="btn btn-danger" aria-label="удалить контакт">
          Удалить
        </button>
      </td>
    </tr>
  )
}