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

  render() {
    return (
      <section className="ContactsForm-section">
        <h2 className="main-heading">Добавление нового контакта</h2>

        <form onSubmit={this.sendData}>
          {this.getNameInput()}
          {this.getSurNameInput()}
          {this.getPhoneInput()}
          <span><sup>*</sup> обязательное поле</span>

          <div className="buttons-group">
            {this.getButtonSubmit()}
            {this.getButtonCancel()}
          </div>
        </form>

      </section>
    );
  }

  sendData = (event) => {
    if (event) {
      event.preventDefault();
      const contact = this.state;
      this.props.addContact(contact);
    } else {
      this.props.addContact(null);
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
    return (
      <label className="form-group main-input">Имя <sup>*</sup>
        <input type="text" value={this.state.value} onChange={this.changeInput('name')}
          className={"form-control mt-1 " +
            ((this.state.name !== '') && !this.validateName(this.state.name) ? 'not-valid' : null)}
          placeholder="Введите имя" autoFocus required />
        <div role="alert"
          className={"alert alert-danger " +
            ((this.state.name !== '') && !this.validateName(this.state.name) ? null : 'not-valid-alert')}>
          Min длина = 3 символа
            </div>
      </label>
    );
  }

  getSurNameInput() {
    return (
      <label className="form-group main-input">Фамилия <sup>*</sup>
        <input type="text" value={this.state.value} onChange={this.changeInput('surName')}
          className={"form-control mt-1 " +
            ((this.state.surName !== '') && !this.validateSurName(this.state.surName) ? 'not-valid' : null)}
          required placeholder="Введите фамилию" />
        <div role="alert"
          className={"alert alert-danger " +
            ((this.state.surName !== '') && !this.validateSurName(this.state.surName) ? null : 'not-valid-alert')}>
          Min длина = 10 символов
            </div>
      </label>
    );
  }

  getPhoneInput() {
    return (
      <label className="form-group main-input">Телефон <sup>*</sup> <small>+380 (xx) xxx-xx-xx или xxx xxx-xx-xx</small>
        <input type="tel" value={this.state.value} onChange={this.changeInput('phone')}
          className={"form-control mt-1 " +
            ((this.state.phone !== '') && !this.validatePhone(this.state.phone) ? 'not-valid' : null)}
          required placeholder="Введите телефон"
          pattern="^\d{3} \d{3}-\d{2}-\d{2}$|^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$" />
        <div role="alert"
          className={"alert alert-danger " +
            ((this.state.phone !== '') && !this.validatePhone(this.state.phone) ? null : 'not-valid-alert')}>
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

  getButtonSubmit() {
    return (
      <button type="submit" className="btn btn-primary mt-3 mr-3 main-button"
        disabled={!(this.validateName(this.state.name) &&
          this.validateSurName(this.state.surName) &&
          this.validatePhone(this.state.phone))}>
        Сохранить
      </button>
    );
  }

  getButtonCancel() {
    return (
      <button type="button" onClick={() => this.sendData(null)} className="btn btn-primary mt-3 main-button">
        Отменить
      </button>
    );
  }
}