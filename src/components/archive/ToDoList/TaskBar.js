export function TaskBar({ isAdded, currentTask, add, update, cancel, change }) {
  const getTaskArea =
    <textarea
      value={currentTask}
      onChange={event => change(event.target.value)}
      rows={(currentTask.length / 40 > 1) ? Math.ceil(currentTask.length / 40) : "1"}
      className="ToDoList-task"
      placeholder="Введите текст нового задания">
    </textarea>

  const getSendButton =
    <button
      type="button"
      className="btn btn-primary mr-3"
      disabled={currentTask.length < 1}
      onClick={() => (isAdded) ? add(currentTask) : update(currentTask)}>
      {(isAdded) ? 'Добавить' : 'Сохранить'}
    </button>

  const getCancelButton =
    <button
      type="button"
      className="btn btn-danger ml-3"
      disabled={isAdded}
      onClick={() => cancel()}>
      Отменить
    </button>

  return (
    <>
      {getTaskArea}
      <div className="ToDoList-actions">
        {getSendButton}
        {getCancelButton}
      </div>
    </>
  );
}