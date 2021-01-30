import React from 'react';
import './style.scss';

export class ContactsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surName: '',
      phone: ''
    }
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    const contact = this.props.contact;
    if (contact) {
      this.setState({
        name: contact.name,
        surName: contact.surName,
        phone: contact.phone
      });
    }
  }

  render() {
    const { name, surName, phone } = this.state;

    return (
      <section className="ContactsForm-section">
        <h2 className="main-heading">
          {(!this.props.contact) ? 'Добавление нового контакта' : 'Редактирование контакта'}
        </h2>

        <form onSubmit={this.sendData}>
          {this.getNameInput()}
          {this.getSurNameInput()}
          {this.getPhoneInput()}
          <span><sup>*</sup> обязательное поле</span>

          <div className="buttons-group">
            <button type="submit"
              disabled={!(this.validateName(name) &&
                this.validateSurName(surName) &&
                this.validatePhone(phone))}
              className="btn btn-primary mt-3 mr-3 main-button" aria-label="сохранить данные">
              Сохранить
            </button>

            <button type="button" onClick={() => this.props.toggleForm(false)}
              className="btn btn-danger mt-3 main-button" aria-label="отменить действие">
              Отменить
            </button>
          </div>
        </form>
      </section>
    );
  }

  sendData = (event) => {
    event.preventDefault();
    const contact = { ...this.props.contact, name: this.state.name, surName: this.state.surName, phone: this.state.phone };
    if (!this.props.contact) {
      this.props.addContact(contact);
    } else {
      this.props.updateContact(contact);
    }
  }

  changeInput(field) {
    return event => {
      this.setState({
        [field]: event.target.value,
      })
    }
  }

  getNameInput() {
    const { name } = this.state;
    return (
      <label className="form-group main-input">Имя <sup>*</sup>
        <input
          type="text"
          value={name}
          onChange={this.changeInput('name')}
          className={"form-control mt-1 " +
            ((name !== '') && !this.validateName(name) ? 'not-valid' : null)}
          placeholder="Введите имя"
          autoFocus
          required
        />
        <div role="alert"
          className={"alert alert-danger " +
            ((name !== '') && !this.validateName(name) ? null : 'not-valid-alert')}>
          Min длина = 3 символа
        </div>
      </label>
    );
  }

  getSurNameInput() {
    const { surName } = this.state;
    return (
      <label className="form-group main-input">Фамилия <sup>*</sup>
        <input
          type="text"
          value={surName}
          onChange={this.changeInput('surName')}
          className={"form-control mt-1 " +
            ((surName !== '') && !this.validateSurName(surName) ? 'not-valid' : null)}
          placeholder="Введите фамилию"
          required
        />
        <div role="alert"
          className={"alert alert-danger " +
            ((surName !== '') && !this.validateSurName(surName) ? null : 'not-valid-alert')}>
          Min длина = 10 символов
        </div>
      </label>
    );
  }

  getPhoneInput() {
    const { phone } = this.state;
    return (
      <label className="form-group main-input">Телефон <sup>*</sup>
        <small>+380 (xx) xxx-xx-xx или xxx xxx-xx-xx</small>
        <input
          type="tel"
          value={phone}
          onChange={this.changeInput('phone')}
          className={"form-control mt-1 " +
            ((phone !== '') && !this.validatePhone(phone) ? 'not-valid' : null)}
          pattern="^\d{3} \d{3}-\d{2}-\d{2}$|^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$"
          placeholder="Введите телефон"
          required
        />
        <div role="alert"
          className={"alert alert-danger " +
            ((phone !== '') && !this.validatePhone(phone) ? null : 'not-valid-alert')}>
          Неправильный формат
        </div>
      </label>
    );
  }

  validateName(value) {
    return value.length >= 3;
  }

  validateSurName(value) {
    return value.length >= 10;
  }

  validatePhone(value) {
    const regexp = /^\d{3} \d{3}-\d{2}-\d{2}$|^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
    return regexp.test(value);
  }

}