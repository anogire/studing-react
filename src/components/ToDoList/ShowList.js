import { React } from 'react';
import { connect } from 'react-redux';
import { deleteItem, editItem } from '../../store/actions';
import { TaskList } from './TaskList';

const mapStateToProps = (state) => ({
  id: state.currentTask.id,
  isAdded: state.currentTask.isAdded,
  todoList: state.todoList
});

const mapDispatchToProps = {
  edit: editItem,
  remove: deleteItem
};

function _ShowList({ todoList, isAdded, id, edit, remove }) {
  if (todoList.length === 0) {
    return (
      <h2 className="main-heading">Список заданий пуст!</h2>
    )
  } else {
    return (
      <>
        <h2 className="main-heading">Текущие задания</h2>
        <TaskList
          todoList={todoList}
          isAdded={isAdded}
          id={id}
          edit={edit}
          remove={remove}
        />
      </>
    )
  }
}

export const ShowList = connect(mapStateToProps, mapDispatchToProps)(_ShowList);