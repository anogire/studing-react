import React from 'react';
import '../styles/contacts-form.scss';

export class ContactsForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.updateData,
      name: '',
      surName: '',
      phone: ''
    }
    this.changeInput = this.changeInput.bind(this);
  }

  render() {
    return this.state.isShow && (
      <section className="ContactsForm-section">
        <h2 className="main-heading">Добавление нового контакта</h2>
        <form onSubmit={this.saveContact}>

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

          <span><sup>*</sup> обязательное поле</span>
          <div className="buttons-group">
            <button type="submit" className="btn btn-primary mt-3 mr-3 main-button"
              disabled={!(this.validateName(this.state.name) &&
                this.validateSurName(this.state.surName) &&
                this.validatePhone(this.state.phone))}>
              Сохранить
            </button>
            <button type="button" onClick={this.toggleForm} className="btn btn-primary mt-3 main-button">
              Отменить
          </button>
          </div>

        </form>
      </section>
    );
  }

  toggleForm = () => {
    this.setState({
      isShow: false
    });
    this.props.updateData(this.state.isShow);
  }

  changeInput(field) {
    return event => {
      this.setState({
        [field]: event.target.value,
      })
    }
  }

  saveContact = (event) => {
    event.preventDefault();
    const contact = {
      name: this.state.name,
      surName: this.state.surName,
      phone: this.state.phone
    }
    this.props.addContact(contact);
    this.toggleForm();
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