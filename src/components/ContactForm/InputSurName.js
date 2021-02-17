import './style.scss';

export function InputSurName({ surName, change, validateSurName }) {
  return (
    <label className="form-group main-input">Фамилия <sup>*</sup>
      <input
        type="text"
        name="surName"
        value={surName}
        onChange={event => change(event.target.name, event.target.value)}
        className={"form-control mt-1 " +
          ((surName !== '') && !validateSurName(surName) ? 'not-valid' : null)}
        placeholder="Введите фамилию"
        required
      />
      <div role="alert"
        className={"alert alert-danger " +
          ((surName !== '') && !validateSurName(surName) ? null : 'not-valid-alert')}>
        Min длина = 10 символов
      </div>
    </label>
  );
}