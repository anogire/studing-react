import { CompleteBox } from './CompleteBox';

export function TaskList({ todoList, isAdded, id, edit, remove }) {

  function getEditButton(index, item) {
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={() => edit(index, item)}>
        Редактировать
      </button>
    )
  }

  function getDeleteButton(index) {
    return (
      <button
        type="button"
        className="btn btn-danger"
        disabled={(!isAdded) && (id === index)}
        onClick={() => remove(index)}>
        Удалить
      </button>
    )
  }

  return (
    <table className="table table-striped table-responsive ToDoList-list">
      <tbody>
        {todoList.map((item, index) =>
          <tr key={index}>
            <td>
              <CompleteBox index={index} />
            </td>
            <td className={"w-100 " + (item.done ? 'task-complete' : null)}>
              {item.description}
            </td>
            <td>
              {getEditButton(index, item)}
            </td>
            <td>
              {getDeleteButton(index)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}