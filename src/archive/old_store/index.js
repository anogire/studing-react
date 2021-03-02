import { createStore } from 'redux';

const emptyTask = {
  id: 0,
  text: '',
  isAdded: true
}

function reducer(state, action) {
  let todoList = [...state.todoList];

  switch (action.type) {
    case 'ITEM_ADD':
      todoList.push({
        description: action.text,
        done: false
      });
      return {
        ...state,
        todoList,
        currentTask: emptyTask
      };
    case 'ITEM_EDIT':
      return {
        ...state,
        currentTask: {
          id: action.id,
          text: state.todoList[action.id].description,
          isAdded: false
        }
      };
    case 'ITEM_UPDATE':
      todoList[state.currentTask.id].description = action.text;
      return {
        ...state,
        todoList,
        currentTask: emptyTask
      };
    case 'ITEM_DELETE':
      todoList.splice(action.id, 1);
      let newId = state.currentTask.id;
      if (newId >= action.id) newId--;
      return {
        ...state,
        todoList,
        currentTask: { ...state.currentTask, id: newId }
      };
    case 'CANCEL_CHANGES':
      return {
        ...state,
        currentTask: emptyTask
      };
    case 'TASK_CHANGE':
      return {
        ...state,
        currentTask: { ...state.currentTask, text: action.value }
      };
    case 'COMPLETED_CHANGE':
      todoList[action.id].done = action.value;
      return {
        ...state,
        todoList
      };
    default:
      return state;
  }
}

export const store = createStore(reducer, { todoList: [], currentTask: emptyTask });