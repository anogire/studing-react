import React from 'react';
import './style.scss';

export class CreditCard extends React.Component {
  constructor(props) {
    super(props);

    this.refInput = new Array(4);
    for (let i = 0; i < 4; i++)
      this.refInput[i] = React.createRef();
  }

  componentDidMount() {
    this.refInput[0].current.focus();
  }

  render() {
    return (
      <section className="CreditCard-section">
        <form onSubmit={this.showNumber} className="CreditCard-form">
          <div className="CreditCard-number">
            {this.refInput.map((x, i) =>
              <input
                key={i}
                ref={x}
                onChange={() => this.handleChange(x, i)}
                type="text"
                size="4"
                maxLength="4"
                className="CreditCard-input"
              />)}
          </div>

          <button type="submit" className="CreditCard-button">Проверить</button>
        </form>
      </section>
    );
  }

  handleChange(ref, i) {
    let curRef = ref.current.value;
    if (!this.checkValid(curRef)) {
      this.cutValue(ref);
    }
    if (curRef.length === 0 && i > 0) {
      this.getFocus(this.refInput[i - 1]);
      this.cutValue(this.refInput[i - 1]);
    }
    if (curRef.length === 4 && i < 3) {
      this.getFocus(this.refInput[i + 1]);
    }
  }

  checkValid(x) {
    const regexp = /^\d{1,4}$/;
    return regexp.test(x) ? true : false;
  }

  cutValue = (x) => {
    x.current.value = x.current.value.slice(0, -1);
  }

  getFocus = (x) => {
    x.current.focus();
  }

  showNumber = (event) => {
    event.preventDefault();
    let number = '';
    this.refInput.map((res) => number += res.current.value + ' ');

    alert(number);
  }
}