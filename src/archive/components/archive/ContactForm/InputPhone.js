import './style.scss';

export function InputPhone({ phone, change, validatePhone }) {
  return (
    <label className="form-group main-input">Телефон <sup>*</sup>
      <small>+380 (xx) xxx-xx-xx или xxx xxx-xx-xx</small>
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={event => change(event.target.name, event.target.value)}
        className={"form-control mt-1 " +
          ((phone !== '') && !validatePhone(phone) ? 'not-valid' : null)}
        pattern="^\d{3} \d{3}-\d{2}-\d{2}$|^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$"
        placeholder="Введите телефон"
        required
      />
      <div role="alert"
        className={"alert alert-danger " +
          ((phone !== '') && !validatePhone(phone) ? null : 'not-valid-alert')}>
        Неправильный формат
      </div>
    </label>
  );
}