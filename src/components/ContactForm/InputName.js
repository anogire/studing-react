import './style.scss';

export function InputName({ name, change, validateName }) {

  return (
    <label className="form-group main-input">Имя <sup>*</sup>
      <input
        type="text"
        name="name"
        value={name}
        onChange={event => change(event.target.name, event.target.value)}
        className={"form-control mt-1 " +
          ((name !== '') && !validateName(name) ? 'not-valid' : null)}
        placeholder="Введите имя"
        autoFocus
        required
      />
      <div role="alert"
        className={"alert alert-danger " +
          ((name !== '') && !validateName(name) ? null : 'not-valid-alert')}>
        Min длина = 3 символа
      </div>
    </label>
  );
}