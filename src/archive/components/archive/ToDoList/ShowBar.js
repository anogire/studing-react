import { React } from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem, cancelChanges, changeText } from '../../store/actions';
import { TaskBar } from './TaskBar';

const mapStateToProps = (state) => ({
  isAdded: state.currentTask.isAdded,
  currentTask: state.currentTask.text
});

const mapDispatchToProps = {
  add: addItem,
  update: updateItem,
  cancel: cancelChanges,
  change: changeText
};

function _ShowBar({ isAdded, currentTask, add, update, cancel, change }) {
  return (
    <TaskBar
      isAdded={isAdded}
      currentTask={currentTask}
      add={add}
      update={update}
      cancel={cancel}
      change={change} />
  )
}

export const ShowBar = connect(mapStateToProps, mapDispatchToProps)(_ShowBar);