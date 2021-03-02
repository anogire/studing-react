import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import { changeValue } from '../../store/contactForm/actions';
import { InputName } from './InputName';
import { InputSurName } from './InputSurName';
import { InputPhone } from './InputPhone';

class _ContactForm extends React.Component {

  render() {
    const { contact, change, toggleForm, isNew } = this.props;

    return (
      <section className="ContactForm-section">
        <h2 className="main-heading">
          {(isNew) ? 'Добавление нового контакта' : 'Редактирование контакта'}
        </h2>

        <form onSubmit={this.sendData}>
          <InputName
            name={contact.name}
            change={change}
            validateName={(value) => this.validateName(value)} />
          <InputSurName
            surName={contact.surName}
            change={change}
            validateSurName={(value) => this.validateSurName(value)} />
          <InputPhone
            phone={contact.phone}
            change={change}
            validatePhone={(value) => this.validatePhone(value)} />

          <span><sup>*</sup> обязательное поле</span>

          <div className="buttons-group">
            <button
              type="submit"
              disabled={!(this.validateName(contact.name) &&
                this.validateSurName(contact.surName) &&
                this.validatePhone(contact.phone))}
              className="btn btn-primary mt-3 mr-3 main-button"
              aria-label="сохранить данные">
              Сохранить
            </button>
            <button
              type="button"
              onClick={() => toggleForm(false)}
              className="btn btn-danger mt-3 main-button"
              aria-label="отменить действие">
              Отменить
            </button>
          </div>
        </form>
      </section>
    );
  }

  sendData = (event) => {
    const { contact, updateContact, insertContact, isNew, toggleForm } = this.props;
    event.preventDefault();
    toggleForm(false);
    (isNew) ? insertContact(contact) : updateContact(contact);
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

const mapDispatchToProps = {
  change: changeValue,
};

export const ContactForm = connect(null, mapDispatchToProps)(_ContactForm);